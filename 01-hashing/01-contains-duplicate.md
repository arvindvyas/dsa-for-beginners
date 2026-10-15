# Step 1 · Contains Duplicate

Pattern: **seen set** · <span class="badge easy">Easy</span> · [LeetCode 217](https://leetcode.com/problems/contains-duplicate/)
{: .lead}

## The problem

> Given an integer array `nums`, return `true` if any value appears **at least twice**. Return `false` if every value is different.
>
> - `[1, 2, 3, 1]` → `true`
> - `[1, 2, 3, 4]` → `false`

> Before reading on, take 5 minutes and think: how would you check this by hand?
{: .try}

## The idea

Walk through the array one number at a time and ask one question:

**"Have I seen this number before?"**

If yes, you found a duplicate. If you reach the end without a yes, there is none. Every approach below answers this question. They only differ in how fast they answer it.

## Approach 1 · Brute force

Compare every pair of numbers.

```java
for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] == nums[j]) return true;
    }
}
return false;
```

- **Time: O(n²).** For 100,000 numbers, that is about 5 billion comparisons. Too slow.
- **Space: O(1).**

Why does `j` start at `i + 1`? Comparing a number with itself would always say "duplicate". Comparing the pair (j, i) after (i, j) is wasted work.

## Approach 2 · Sort first

After sorting, equal numbers sit next to each other. So you only need to compare neighbours.

```java
int[] copy = nums.clone();
Arrays.sort(copy);
for (int i = 1; i < copy.length; i++) {
    if (copy[i] == copy[i - 1]) return true;
}
return false;
```

- **Time: O(n log n)**, for the sort.
- **Space: O(1) extra** if you may sort the input array itself. **O(n)** if you sort a copy, like above, so the caller's array stays unchanged.

## Approach 3 · HashSet (best)

Put every number you see into a set. A set answers "is this inside?" in O(1).

```java
Set<Integer> seen = new HashSet<>();
for (int x : nums) {
    if (!seen.add(x)) return true;
}
return false;
```

- **Time: O(n).** One pass, and each `add` is O(1) on average.
- **Space: O(n).** In the worst case, every number goes into the set.

> `seen.add(x)` returns `false` when `x` is already in the set. So one call both checks and inserts.
{: .tip}

## Dry run

Input: `[1, 2, 3, 1]`

| Step | x | Set before | `add(x)` returns | What happens |
|---|---|---|---|---|
| 1 | 1 | `{}` | `true` | keep going |
| 2 | 2 | `{1}` | `true` | keep going |
| 3 | 3 | `{1, 2}` | `true` | keep going |
| 4 | 1 | `{1, 2, 3}` | **`false`** | return `true` |

## Compare the approaches

| Approach | Time | Space | When to use |
|---|---|---|---|
| Brute force | O(n²) | O(1) | Never, except to explain your thinking |
| Sort | O(n log n) | O(1) | Memory is very limited |
| HashSet | **O(n)** | O(n) | Default answer |

This is the main trade-off in hashing: **you spend memory to save time**. You will see it in almost every problem in this topic.

> A common follow-up: "What if you can't use extra memory?" Answer: sort the array. That takes O(n log n) time and O(1) space.
{: .interview}

## Common mistakes

> Calling `seen.contains(x)` and then `seen.add(x)`. It works, but it does two lookups when `add()` alone is enough.
{: .warn}

> Writing `else return false;` inside the loop. The method then returns after checking only the first number.
{: .warn}

## Full code

[`solutions/ContainsDuplicate.java`](https://github.com/arvindvyas/dsa-for-beginners/blob/main/01-hashing/solutions/ContainsDuplicate.java) has all three approaches and tests them against each other.

## Your turn · Contains Duplicate II

<span class="badge easy">Easy</span> · [LeetCode 219](https://leetcode.com/problems/contains-duplicate-ii/)

Same pattern, with one twist: the two equal numbers must be **at most `k` positions apart**.

> Return `true` if there are two different indexes `i` and `j` where `nums[i] == nums[j]` and `|i - j| <= k`.
>
> - `[1, 2, 3, 1]`, k = 3 → `true` (indexes 0 and 3, distance 3)
> - `[1, 2, 3, 1, 2, 3]`, k = 2 → `false` (every equal pair is 3 apart)

> Open [`practice/ContainsDuplicateII.java`](https://github.com/arvindvyas/dsa-for-beginners/blob/main/01-hashing/practice/ContainsDuplicateII.java), write your solution, and run it until every test prints `PASS`.
{: .try}

<details>
<summary>Hint 1</summary>
<p>In Contains Duplicate, you only needed to know <em>if</em> you had seen a number. Here you also need to know <em>where</em> you saw it last.</p>
</details>

<details>
<summary>Hint 2</summary>
<p>A <code>HashSet</code> only stores values. Which structure stores a value together with one extra piece of information about it?</p>
</details>

<div class="pager">
  <a class="prev" href="./"><small>Back</small>Hashing overview</a>
  <span class="next"><small>Next</small>Step 2 · Valid Anagram (soon)</span>
</div>
