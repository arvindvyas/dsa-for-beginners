01 · hashing (HashMap / HashSet)
================================

almost every "optimal" solution you'll see later — two sum, sliding window, prefix sums, graph visited sets, DP memo — is a hash map underneath. get this one right and half of DSA gets easier.

how a HashMap works inside
--------------------------

```
key "apple" ──hash()──▶ 93029210 ──% 16──▶ bucket 10 ──▶ store value there
```

1. inside, a HashMap is just an **array of buckets**
2. for every key we compute `hashCode()` → a big number → `index = hash % capacity`
3. jump straight to that index → **O(1)** lookup, no scanning

**collision** — two keys land in the same bucket. two ways to handle it:
- **chaining** — each bucket holds a small list (Java does this; a long chain even turns into a red-black tree since Java 8)
- **open addressing** — probe for the next free slot (Python `dict`, Ruby `Hash`)

**resize** — when `size / capacity` (the *load factor*) crosses **0.75**, Java doubles the array and re-hashes every key. that one resize is O(n), but spread across all inserts it's still **amortized O(1)**.

**worst case** — if every key collides, lookups degrade to O(n). in an interview say: *"average O(1), worst case O(n)."*

**why keys should be immutable** — change a key after inserting it and its hash changes, so the map looks in the wrong bucket and "loses" your value. in Java, if you override `equals()` you **must** override `hashCode()` too.

Java cheat sheet
----------------

```java
Map<Integer, Integer> count = new HashMap<>();
count.put(x, count.getOrDefault(x, 0) + 1);   // frequency count
count.merge(x, 1, Integer::sum);              // same thing, shorter

Set<Integer> seen = new HashSet<>();
if (!seen.add(x)) { /* x was already there */ } // add() returns false on duplicate

Map<String, List<String>> groups = new HashMap<>();
groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word); // group by key
```

the 4 patterns
--------------

| pattern | the question in your head | tool |
|---|---|---|
| **seen-set** | "have I seen this before?" | `HashSet` |
| **frequency count** | "how many times does it appear?" | `HashMap<x, count>` |
| **complement lookup** | "the number that pairs with me — did it already show up?" | `map.containsKey(target - x)` |
| **group by key** | "put all things of the same *kind* together" | `HashMap<signature, List>` |

**signal words in a problem:** *duplicate, pair, count, frequency, anagram, seen before, group, first unique* → think hashing.

how this page works: learn → practice
--------------------------------------

each step has two halves:

1. **learn** — one problem explained end to end: intuition, brute force, optimal, dry run, Java code. read it, then type the code yourself.
2. **practice** — a *different* problem with the **same pattern**. starter file + tests are in [`practice/`](practice/). no solution here — that's the point.

| step | learn (explained) | pattern | practice (you solve) |
|------|-------------------|---------|----------------------|
| 1 | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) | seen-set | [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/) |
| 2 | [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | frequency count | soon |
| 3 | [Two Sum](https://leetcode.com/problems/two-sum/) | complement lookup | soon |
| 4 | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | group by key | soon |
| 5 | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | frequency + bucket sort | soon |
| 6 | [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) | seen-set trick | soon |
| 7 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | prefix sum + hashmap | soon |

---

step 1 · Contains Duplicate
---------------------------

> given an integer array `nums`, return `true` if any value appears **at least twice**, otherwise `false`.
>
> `[1,2,3,1]` → `true` · `[1,2,3,4]` → `false`

### the question in your head

*"while walking the array — have I seen this number before?"* → that's the **seen-set** pattern.

### approach 1 · brute force — compare every pair

```java
for (int i = 0; i < nums.length; i++)
    for (int j = i + 1; j < nums.length; j++)
        if (nums[i] == nums[j]) return true;
return false;
```

- **time O(n²)** — n = 10⁵ means ~5 billion comparisons. too slow.
- **space O(1)**
- why `j = i + 1`? comparing `i` with itself would always say "duplicate", and comparing (j, i) after (i, j) is wasted work.

### approach 2 · sort — duplicates become neighbours

```java
int[] copy = nums.clone();
Arrays.sort(copy);
for (int i = 1; i < copy.length; i++)
    if (copy[i] == copy[i - 1]) return true;
return false;
```

- **time O(n log n)** for the sort
- **space O(1) extra** if you're allowed to sort the input in place, O(n) if you copy it (like above, so the caller's array isn't changed)
- useful when memory is tight

### approach 3 · HashSet — remember what you've seen ✅

```java
Set<Integer> seen = new HashSet<>();
for (int x : nums) {
    if (!seen.add(x)) return true;   // add() returns false if x was already there
}
return false;
```

- **time O(n)** — one pass, each `add` is O(1) on average
- **space O(n)** — worst case every element goes into the set
- **trade-off:** we spend memory to buy speed. this trade appears in almost every hashing problem.

### dry run — `[1, 2, 3, 1]`

| x | seen before `add` | `add(x)` returns | action |
|---|-------------------|------------------|--------|
| 1 | {} | true | keep going |
| 2 | {1} | true | keep going |
| 3 | {1, 2} | true | keep going |
| 1 | {1, 2, 3} | **false** | return `true` |

### common mistakes

- calling `seen.contains(x)` and then `seen.add(x)` — works, but two hash lookups where one is enough. `add()` already tells you.
- returning `false` **inside** the loop (`else return false`) — exits after the first element.
- not knowing the sorting trade-off — interviewers often ask *"what if you can't use extra memory?"* → answer: sort, O(n log n) time, O(1) space.

### code

[`solutions/ContainsDuplicate.java`](solutions/ContainsDuplicate.java) — all three approaches, tested against each other.

### now you practice → Contains Duplicate II

same pattern, one twist: the two equal values must be **at most `k` positions apart**.
starter file: [`practice/ContainsDuplicateII.java`](practice/ContainsDuplicateII.java)

```
java 01-hashing/practice/ContainsDuplicateII.java
```
