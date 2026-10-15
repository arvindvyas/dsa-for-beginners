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

problems
--------

| # | problem | pattern | level |
|---|---------|---------|-------|
| 1 | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) | seen-set | easy |
| 2 | [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | frequency count | easy |
| 3 | [Two Sum](https://leetcode.com/problems/two-sum/) | complement lookup | easy |
| 4 | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | group by key | medium |
| 5 | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | frequency + bucket sort | medium |
| 6 | [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) | seen-set trick | medium |
| 7 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | prefix sum + hashmap | medium (boss) |

<!-- each problem's write-up gets added below as we solve it -->
