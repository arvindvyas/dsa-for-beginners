# Hashing

HashMap and HashSet: the most useful tool in DSA.
{: .lead}

## What is hashing?

**Hashing** means turning any piece of data (a number, a word, an object) into a fixed-size number called a **hash**. The function that does this is a **hash function**.

```java
"apple".hashCode()   // 93029210
"apple".hashCode()   // 93029210, same input gives the same hash every time
"apples".hashCode()  // -1411061671, a small change gives a very different hash
```

```ruby
"apple".hash   # 4404261846799124996 (your number will be different)
"apple".hash   # same number again, in the same run
"apples".hash  # a very different number
```

In Java, a hash can be negative. The number overflows `int` and wraps around. Keep this in mind for the next sections.

In Ruby, `"apple".hash` gives a **different number every time you start Ruby**. Ruby adds a random seed when it starts, so attackers can't predict hashes and flood a server with keys that all collide. Inside one run, the same string always gives the same hash, and that is all a `Hash` needs.

A good hash function has three properties:

1. **Deterministic**: the same input always gives the same hash.
2. **Spreads values evenly**: different inputs rarely share a hash, so they spread across the buckets.
3. **Fast**: computing it costs almost nothing.

Why is this useful? With a hash, you can turn "find this item" into "go to this exact position". You don't search for the item. You **calculate** where it is.

## HashMap vs HashSet

Both are built on hashing. The difference is what they store. In Ruby, they are called `Set` and `Hash`.

| | `HashSet` (Ruby `Set`) | `HashMap` (Ruby `Hash`) |
|---|---|---|
| Stores | only keys (values) | key → value pairs |
| Question it answers | "Is `x` here?" | "What is stored for `x`?" |
| Example | users who already voted | user → number of votes |
| Duplicates | ignored | same key overwrites the old value |

Fun fact: in Java, `HashSet` is a `HashMap` underneath. It stores your item as the key and a dummy object as the value.

## Why hashing matters

### In interviews

Hashing is the most common way to turn a slow solution into a fast one.

| Without hashing | With hashing |
|---|---|
| "Is `x` in this array?" → scan the array, **O(n)** | `set.contains(x)` → **O(1)** |
| Check every pair → **O(n²)** | One pass with a map → **O(n)** |

When an interviewer asks "can you do better?", the answer is often "yes, with a HashMap". Many of the next topics also use it inside: sliding window, prefix sums, graph visited sets, and memoization in DP.

### In real systems

You use hashing every day, even when you don't see it:

| Where | How hashing is used |
|---|---|
| **Caches** (Redis, Memcached) | key → value lookup in O(1) |
| **Database indexes** | hash indexes find a row without scanning the table |
| **Git** | every commit and file is stored by its hash (that's the commit sha) |
| **Load balancers** | `hash(user_id) % servers` sends the same user to the same server |
| **Deduplication** | compare file hashes instead of comparing whole files |
| **Passwords** | stored as a hash, never as plain text (this uses a *cryptographic* hash, which is slow on purpose) |

> A HashMap's hash function and a password hash are different tools. A HashMap needs a **fast** hash. A password needs a **slow**, one-way hash such as bcrypt, so attackers can't guess passwords quickly.
{: .tip}

### When NOT to use hashing

Hashing is not always the answer:

- **You need sorted order** (smallest, largest, a range of values): use `TreeMap` or `TreeSet`, which are O(log n) but keep keys sorted.
- **Memory is very tight**: a hash map uses extra memory for buckets and empty slots.
- **The keys are small integers** such as `0..25` for letters: a plain array `int[26]` is faster and simpler.

## How a HashMap works inside

A HashMap turns a key into an array index, so it can jump straight to the value without searching.

<div class="flow">
  <span class="node">key "apple"</span>
  <span class="arrow">hashCode()</span>
  <span class="node">93029210</span>
  <span class="arrow">% 16</span>
  <span class="node">bucket 10</span>
  <span class="arrow">store</span>
  <span class="node end">value</span>
</div>

1. Inside, a HashMap is just an **array of buckets**.
2. For each key, Java calls `hashCode()` to get a big number.
3. It turns that number into an index: `index = hash % capacity`.
4. It goes straight to that index. No scanning, so lookup is **O(1)**.

### Collisions

Two different keys can land in the same bucket. This is called a **collision**. There are two common fixes:

| Method | How it works | Used by |
|---|---|---|
| Chaining | Each bucket keeps a small list of entries | Java (a long list becomes a red-black tree since Java 8) |
| Open addressing | Look for the next empty slot | Python `dict`, Ruby `Hash` |

### Resizing

The **load factor** is `size / capacity`. When it goes above **0.75**, Java doubles the array and moves every key to its new bucket.

One resize costs O(n), but it happens rarely. Spread over all the inserts, each insert is still **O(1) on average**. This is called *amortized* O(1).

> Say "average O(1), worst case O(n)". The worst case happens when every key lands in the same bucket.
{: .interview}

### Keys must not change

If you change a key after putting it in the map, its hash changes too. The map then looks in the wrong bucket and can't find your value.

> If you override `equals()` in a Java class, you **must** override `hashCode()` too. Otherwise two equal objects can land in different buckets.
{: .warn}

## Going deeper: Java's HashMap

You don't need these details to solve problems. They help when an interviewer asks follow-up questions. Most of this section is about Java. The Ruby differences are called out.

### How `String.hashCode()` is computed

This is a simplified version of what `s.hashCode()` does for a string `s`. Copy it into a file and run it:

```java
public class Main {
    static int hash(String s) {
        int h = 0;
        for (char c : s.toCharArray()) {
            h = 31 * h + c;   // c is used as a number: 'a' = 97, 'b' = 98
        }
        return h;
    }

    public static void main(String[] args) {
        System.out.println(hash("ab"));        // 3105
        System.out.println("ab".hashCode());   // 3105, same as Java's own
        System.out.println(hash("apples"));    // -1411061671, overflowed
    }
}
```

```ruby
def hash31(s)
  h = 0
  s.each_char do |c|
    h = 31 * h + c.ord   # ord turns a character into its number: 'a' = 97
  end
  h
end

puts hash31("ab")       # 3105
puts hash31("apples")   # 2883905625, Ruby integers never overflow
puts "ab".hash          # Ruby's own hash is different (see below)
```

> In Java, a method can't be written inside another method. Put `hash` **next to** `main`, inside the class, not inside `main`. Otherwise you get `illegal start of expression`.
{: .warn}

Example with `s = "ab"`:

| Step | c | h = 31 * h + c |
|---|---|---|
| start | | 0 |
| 1 | `'a'` (97) | 31 × 0 + 97 = **97** |
| 2 | `'b'` (98) | 31 × 97 + 98 = **3105** |

So `"ab".hashCode()` is `3105`. In general, for a string of length n the result is `s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]`.

For long strings this number gets too big for an `int` and wraps around. Ruby shows the "real" value for `"apples"`: `2883905625`. That is bigger than the largest `int` (about 2.1 billion), so Java subtracts 2³² and gets `2883905625 - 4294967296 = -1411061671`.

Ruby's own `String#hash` doesn't use the 31 formula. It uses a function called SipHash with a random seed, which is why its value changes between runs.

Why 31? It's an odd prime, so it spreads values well. Also, `31 * h` can be computed fast as `(h << 5) - h`. For an `Integer`, the hash code is simply the number itself.

### Java uses `&` instead of `%`

Java keeps the capacity a power of two (16, 32, 64, ...). Then it can use `hash & (capacity - 1)` instead of `hash % capacity`. This has two benefits:

1. A bitwise AND is faster than division.
2. It always gives an index from `0` to `capacity - 1`, even for a negative hash. In Java, `-1411061671 % 16` is `-7`, which is not a valid array index.

Java also mixes the high bits into the low bits first (`h ^ (h >>> 16)`). Without this step, keys whose hashes differ only in the high bits would all land in the same bucket.

### Default numbers

| Setting | Value |
|---|---|
| Starting capacity | 16 buckets |
| Load factor | 0.75 (16 × 0.75 = 12, so it resizes when the 13th entry is added) |
| List becomes a tree | when one bucket has more than 8 entries and the map has at least 64 buckets |

### Which map to pick

| Class | Order of keys | Speed | Use when |
|---|---|---|---|
| `HashMap` | no order | O(1) | default choice |
| `LinkedHashMap` | insertion order | O(1) | you need the order items were added (LRU cache) |
| `TreeMap` | sorted | O(log n) | you need smallest, largest, or a range |
| `ConcurrentHashMap` | no order | O(1) | many threads read and write at once |
| `Hashtable` | no order | O(1), slower | old code only, don't use it in new code |

> Ruby's `Hash` keeps keys in the order you added them, like Java's `LinkedHashMap`. Ruby has no built-in sorted map. Sort the keys yourself when you need order.
{: .tip}

## Cheat sheet

Count how many times each value appears:

```java
Map<Integer, Integer> count = new HashMap<>();
count.put(x, count.getOrDefault(x, 0) + 1);
count.merge(x, 1, Integer::sum);   // same thing, shorter
```

```ruby
count = Hash.new(0)   # missing keys start at 0
count[x] += 1
nums.tally            # count a whole array at once: {1=>2, 2=>1}
```

Check if you have seen a value before:

```java
Set<Integer> seen = new HashSet<>();
if (!seen.add(x)) {
    // add() returns false when x was already in the set
}
```

```ruby
require 'set'

seen = Set.new
unless seen.add?(x)
  # add? returns nil when x was already in the set
end
```

Group values by a key:

```java
Map<String, List<String>> groups = new HashMap<>();
groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
```

```ruby
groups = Hash.new { |h, k| h[k] = [] }   # missing keys start as a new []
groups[key] << word
words.group_by { |w| w.chars.sort.join }  # group a whole array at once
```

> Don't write `Hash.new([])`. Every missing key then shares the **same** array, so `<<` adds the word to all groups.
{: .warn}

## The 4 patterns

Almost every hashing problem is one of these four:

| Pattern | Ask yourself | Tool |
|---|---|---|
| **Seen set** | Have I seen this value before? | `HashSet` / Ruby `Set` |
| **Frequency count** | How many times does it appear? | `HashMap<value, count>` / `Hash.new(0)` |
| **Complement lookup** | Did the value that pairs with me already appear? | `map.containsKey(target - x)` / `h.key?(target - x)` |
| **Group by key** | Which items are the same *kind*? | `HashMap<key, List>` / `Hash.new { \|h, k\| h[k] = [] }` |

> Words in the problem that point to hashing: *duplicate, pair, count, frequency, anagram, seen before, group, first unique*.
{: .tip}

## Steps

Each step is one **learn** problem and one **practice** problem with the same pattern.

<div class="cards">
  <a class="card" href="01-contains-duplicate.html">
    <span class="card-step">Step 1 · Seen set</span>
    <span class="card-title">Contains Duplicate</span>
    <span class="card-meta">Practice: Contains Duplicate II</span>
  </a>
  <div class="card soon"><span class="card-step">Step 2 · Frequency count</span><span class="card-title">Valid Anagram</span><span class="card-meta">coming soon</span></div>
  <div class="card soon"><span class="card-step">Step 3 · Complement lookup</span><span class="card-title">Two Sum</span><span class="card-meta">coming soon</span></div>
  <div class="card soon"><span class="card-step">Step 4 · Group by key</span><span class="card-title">Group Anagrams</span><span class="card-meta">coming soon</span></div>
  <div class="card soon"><span class="card-step">Step 5 · Frequency + buckets</span><span class="card-title">Top K Frequent Elements</span><span class="card-meta">coming soon</span></div>
  <div class="card soon"><span class="card-step">Step 6 · Seen set trick</span><span class="card-title">Longest Consecutive Sequence</span><span class="card-meta">coming soon</span></div>
  <div class="card soon"><span class="card-step">Step 7 · Prefix sum + map</span><span class="card-title">Subarray Sum Equals K</span><span class="card-meta">coming soon</span></div>
</div>
