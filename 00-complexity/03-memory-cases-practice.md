# Page 3 · Memory, cases and practice

Space complexity, best and worst case, amortized cost, and lots of practice.
{: .lead}

> Your method gets an array of n numbers and makes **a copy** of it before working. Does it still use only a fixed amount of extra memory?
{: .predict}

<details markdown="1">
<summary>Show the answer</summary>

**No.** The copy has n numbers, so the extra memory grows with n. That's **O(n) space**. Memory is measured with Big O too, and that's the first topic on this page.

</details>

## Space complexity

**Time complexity** counts steps. **Space complexity** counts the **extra memory** your code needs as n grows. The input itself usually isn't counted.

| Code | Extra memory | Space |
|---|---|---|
| a few variables (`sum`, `i`, `max`) | same for any n | O(1) |
| a `HashSet` that may hold every number | grows with n | O(n) |
| a copy of the array | grows with n | O(n) |
| an n × n grid | grows with n² | O(n²) |

You saw the trade-off in [Contains Duplicate](../01-hashing/01-contains-duplicate.html#compare-the-approaches): the HashSet method spends O(n) memory to save time (O(n) instead of O(n²)).

> **Spend memory to save time.** This is the most common trade-off in DSA. When an interviewer asks "can you do it faster?", the answer often uses more memory.
{: .tip}

## Best, average and worst case

The same code can take a different number of steps for different inputs of the same size.

Think of looking for "Priya" in a guest list of n names:

| Case | When | Steps |
|---|---|---|
| Best | Priya is first | 1 |
| Average | Priya is somewhere in the middle | about n/2, which is O(n) |
| Worst | Priya is last, or not there | n |

**When people say just "O(…)", they usually mean the worst case.** It's a promise: "it will never be slower than this."

The big exception is **hash maps**. A lookup is O(1) on average, but O(n) in the worst case, when every key lands in the same bucket ([see how a HashMap works inside](../01-hashing/#collisions)). For hash maps, people quote the average.

> For hash maps, say both cases: "O(1) on average, O(n) in the worst case". Interviewers like hearing that you know the difference.
{: .interview}

## Amortized: paying in instalments

An `ArrayList` in Java, or an `Array` in Ruby, sits on top of a fixed-size block of memory. When the block is full, the list:

1. gets a block **twice as big**,
2. copies every item into it, and
3. throws the old block away.

That copy costs O(n). So isn't adding an item O(n)?

> You add **16 items** to an empty list. It starts with room for 1 item and doubles whenever it's full. How many items get **copied** in total?
{: .predict}

<details markdown="1">
<summary>Show the answer</summary>

The list is full at sizes 1, 2, 4 and 8, so it copies **1 + 2 + 4 + 8 = 15 items**.

Add the 16 normal writes and you get 31 steps for 16 items, **less than 2 steps per item**. For any n, the total stays under 2n.

</details>

Most adds are cheap. Once in a while, one add is expensive. Spread over all the adds, each costs a small constant on average. That's called **amortized O(1)**.

It's like paying a big bill in monthly instalments: one big payment, spread out so each month costs little. The `HashMap` resize from Hashing works the same way.

> Java's `ArrayList` grows by 1.5× instead of 2×. The idea and the result are the same: amortized O(1).
{: .tip}

## From n to the right complexity

A computer does roughly **10⁸ simple steps per second**. Combine that with the input size in a problem, and you can guess which complexity is fast enough before you write any code:

| If n is up to… | You can afford… | Typical idea |
|---|---|---|
| 10 | O(n!) | try every order |
| 20 | O(2ⁿ) | try every subset |
| 500 | O(n³) | three nested loops |
| 10,000 | O(n²) | two nested loops |
| 1,000,000 | O(n log n) or O(n) | sort, or one pass with a HashMap |
| more than that | O(log n) or O(1) | binary search, or a math formula |

Check the first row: 10! = 3,628,800 steps, under a second. Now check the O(n²) row with n = 100,000 instead: 10¹⁰ steps, about 100 seconds. Too slow.

> On LeetCode, read the **constraints** before anything else. "n ≤ 10⁵" quietly tells you: "O(n²) won't pass, find O(n log n) or O(n)."
{: .interview}

These are rough numbers. Java is often faster than 10⁸ steps per second for simple loops, and Ruby is usually slower. Measure it yourself below.

## Measure it yourself

This experiment runs an O(n) method and an O(n²) method with n, then 2n, then 4n, and prints how much slower each one got.

```bash
java 00-complexity/experiments/Doubling.java
ruby 00-complexity/experiments/doubling.rb
```

Real output on a laptop (Java):

```text
O(n)   sumAll
  n =  20,000,000        9.9 ms
  n =  40,000,000       19.8 ms  -> 2.0x slower
  n =  80,000,000       39.7 ms  -> 2.0x slower

O(n^2) countEqualPairs
  n =      10,000        9.0 ms
  n =      20,000       36.4 ms  -> 4.0x slower
  n =      40,000      146.4 ms  -> 4.0x slower
```

The doubling question from page 1, measured: **O(n) → 2×, O(n²) → 4×.** Your times will be different, but the ratios will be close.

Files: [`Doubling.java`](https://github.com/arvindvyas/dsa-for-beginners/blob/main/00-complexity/experiments/Doubling.java) · [`doubling.rb`](https://github.com/arvindvyas/dsa-for-beginners/blob/main/00-complexity/experiments/doubling.rb)

> Java speeds code up while it runs, so the first measurement is often wrong. That's why the file warms up first and keeps the fastest of 3 runs. Ruby doesn't need this as much.
{: .warn}

> Add a third method to the file, for example one that sorts the array first. Before you run it, **guess** the ratio. Is it close to 2× or 4×?
{: .try}

## Practice: guess the complexity

For each snippet, decide the **time** complexity before you open the answer. Use the pictures from page 2.

### Snippet 1

```java
int last = nums[nums.length - 1];
```

```ruby
last = nums[-1]
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(1).** One jump, open the book at a page. The size of the array doesn't matter.

</details>

### Snippet 2

```java
int max = Integer.MIN_VALUE;
for (int x : nums) max = Math.max(max, x);
int min = Integer.MAX_VALUE;
for (int x : nums) min = Math.min(min, x);
```

```ruby
max = nums[0]
nums.each { |x| max = x if x > max }
min = nums[0]
nums.each { |x| min = x if x < min }
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(n).** Two loops *one after another*: n + n = 2n. Drop the 2.

</details>

### Snippet 3

```java
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        grid[i][j] = i * j;
    }
}
```

```ruby
(0...n).each do |i|
  (0...n).each do |j|
    grid[i][j] = i * j
  end
end
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(n²).** A loop of n inside a loop of n: n × n.

</details>

### Snippet 4

```java
for (String word : words) {
    for (char c = 'a'; c <= 'z'; c++) {
        // check if word contains c
    }
}
```

```ruby
words.each do |word|
  ("a".."z").each do |c|
    # check if word contains c
  end
end
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(n)**, if each word is short. The inner loop always runs 26 times, whatever n is: 26 × n. Drop the 26.

(If the words are long, "check if word contains c" also costs time. Then it's O(n × length of word).)

</details>

### Snippet 5

```java
for (int i = 1; i < n; i = i * 2) {
    System.out.println(i);
}
```

```ruby
i = 1
while i < n
  puts i
  i *= 2
end
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(log n).** `i` doubles each time: 1, 2, 4, 8, … That's the "cut in half" picture in reverse. It reaches n after about log n steps.

</details>

### Snippet 6

```java
for (int i = 0; i < n; i++) {
    for (int j = 1; j < n; j = j * 2) {
        count++;
    }
}
```

```ruby
(0...n).each do |i|
  j = 1
  while j < n
    count += 1
    j *= 2
  end
end
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(n log n).** The outer loop runs n times, and the inner loop doubles, so it runs log n times. n × log n.

</details>

### Snippet 7

```java
List<Integer> seen = new ArrayList<>();
for (int x : nums) {
    if (seen.contains(x)) return true;
    seen.add(x);
}
```

```ruby
seen = []
nums.each do |x|
  return true if seen.include?(x)
  seen << x
end
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(n²).** It looks like one loop, but `contains` / `include?` on a list is a **hidden loop**. Use a `HashSet` (Ruby: `Set`) and it becomes O(n).

</details>

### Snippet 8

```java
for (int a : first) {
    for (int b : second) {
        if (a == b) count++;
    }
}
```

```ruby
first.each do |a|
  second.each do |b|
    count += 1 if a == b
  end
end
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(a × b)**, where a and b are the sizes of the two arrays. It's only O(n²) when both are the same size n.

</details>

### Snippet 9

```java
Arrays.sort(nums);
for (int i = 1; i < nums.length; i++) {
    if (nums[i] == nums[i - 1]) return true;
}
```

```ruby
sorted = nums.sort
(1...sorted.length).each do |i|
  return true if sorted[i] == sorted[i - 1]
end
```

<details class="q" markdown="1">
<summary>Answer</summary>

**O(n log n).** The sort is n log n, and the loop is n. Keep only the biggest part: n log n + n becomes n log n.

</details>

### Snippet 10 · time *and* space

```java
Set<Integer> seen = new HashSet<>();
for (int x : nums) seen.add(x);
return seen.size();
```

```ruby
seen = Set.new
nums.each { |x| seen.add(x) }
seen.size
```

<details class="q" markdown="1">
<summary>Answer</summary>

**Time O(n), space O(n).** One pass of O(1) adds. In the worst case, when all numbers are different, the set holds all n of them.

</details>

## Test yourself

From memory first.

<details class="q" markdown="1">
<summary>1. What does space complexity measure?</summary>

How much **extra** memory the code needs as n grows. The input itself usually isn't counted.

</details>

<details class="q" markdown="1">
<summary>2. What is a HashMap lookup in the average case and in the worst case, and when does the worst case happen?</summary>

O(1) on average, O(n) in the worst case. The worst case happens when every key lands in the same bucket.

</details>

<details class="q" markdown="1">
<summary>3. Adding to an ArrayList sometimes copies every item. Why is it still called O(1)?</summary>

It's **amortized** O(1). The big copies happen rarely (the size doubles each time), so the total work for n adds stays under about 2n, which is a constant per add on average.

</details>

<details class="q" markdown="1">
<summary>4. A problem says n ≤ 100,000. Is an O(n²) solution OK?</summary>

No. 100,000² = 10¹⁰ steps, about 100 seconds. Aim for O(n log n) or O(n).

</details>

<details class="q" markdown="1">
<summary>5. You double n and the time becomes about 4×. What is the Big O?</summary>

**O(n²).** 2× would be O(n), and "almost no change" would be O(log n) or O(1).

</details>

## Explain it

> Explain "amortized O(1)" to a friend using the list-doubling example, in your own words. Then explain why `list.contains(x)` inside a loop is a trap.
{: .try}

## One-page summary

| Idea | Remember it as |
|---|---|
| Big O | "if n grows, how much more work?" (the doubling question) |
| O(1), O(log n), O(n), O(n log n), O(n²) | book page, cutting in half, guest list, merging piles, handshakes |
| Working it out | count steps, drop constants, keep the biggest part |
| Space | extra memory as n grows |
| Worst vs average | plain "O(…)" means worst case, except hash maps (average) |
| Amortized | rare big costs, spread out like instalments |
| 10⁸ rule | read n in the constraints and pick the complexity that fits |

<div class="review" data-id="complexity-3" data-title="Complexity · Page 3 · Memory, cases and practice"></div>

<div class="pager">
  <a class="prev" href="02-finding-big-o.html"><small>Back</small>Page 2 · Working out Big O</a>
  <a class="next" href="../01-hashing/"><small>Next topic</small>Hashing</a>
</div>
