# Page 2 · Working out Big O

Count the steps, keep what matters, and see each Big O as a picture.
{: .lead}

> **100 people** are in a room. Everyone shakes hands with everyone else, exactly once. How many handshakes is that?
{: .predict}

<details markdown="1">
<summary>Show the answer</summary>

**4,950.** Most people guess 100 or 200. The real number is much bigger, and that surprise is what O(n²) feels like. You'll work it out yourself below.

</details>

## Step 1 · Count the steps

Let's count the steps in code that adds up an array.

```java
int sum = 0;            // 1 step
for (int x : nums) {    // runs n times
    sum += x;           //   1 step each time
}
return sum;             // 1 step
```

```ruby
sum = 0                 # 1 step
nums.each do |x|        # runs n times
  sum += x              #   1 step each time
end
sum                     # 1 step
```

Total: **n + 2** steps. If the loop did two things each time, it would be **2n + 2**.

| n | n + 2 | 2n + 2 |
|---|---|---|
| 10 | 12 | 22 |
| 1,000 | 1,002 | 2,002 |
| 1,000,000 | 1,000,002 | 2,000,002 |

Now ask the doubling question from [page 1](01-why-complexity.html#the-one-big-idea). In both columns, when n doubles, the work doubles. They **grow the same way**, so both are **O(n)**.

## Step 2 · Drop what doesn't matter

### Drop the constant numbers

`2n` and `n` both double when n doubles. The `2×` only says "each step is a bit slower", and that changes with the machine anyway. So **O(2n) is O(n)**, and **O(n + 2) is O(n)**.

### Keep only the biggest part

Say some code does `n² + n` steps. How much does the `+ n` part matter?

| n | n² | + n | share of the `n` part |
|---|---|---|---|
| 10 | 100 | 10 | 9% |
| 1,000 | 1,000,000 | 1,000 | 0.1% |
| 1,000,000 | 1,000,000,000,000 | 1,000,000 | 0.0001% |

For big inputs, the `n` part is almost nothing. So **O(n² + n) is O(n²)**.

> Two rules: **drop constant numbers** and **keep only the fastest-growing part**. That's all "working out Big O" means.
{: .tip}

## Step 3 · The five pictures

Each common Big O has one picture. Remember the picture and you can work out the rest yourself.

<div class="cards">
  <div class="card"><span class="card-step">O(1)</span><span class="card-title">Open a book at page 50</span><span class="card-meta">n doubles → same work</span></div>
  <div class="card"><span class="card-step">O(log n)</span><span class="card-title">Cut a book in half, again and again</span><span class="card-meta">n doubles → +1 step</span></div>
  <div class="card"><span class="card-step">O(n)</span><span class="card-title">Read a guest list, name by name</span><span class="card-meta">n doubles → 2× work</span></div>
  <div class="card"><span class="card-step">O(n log n)</span><span class="card-title">Sort cards by merging piles</span><span class="card-meta">n doubles → a bit over 2×</span></div>
  <div class="card"><span class="card-step">O(n²)</span><span class="card-title">Everyone shakes hands</span><span class="card-meta">n doubles → 4× work</span></div>
</div>

### O(1) · Open a book at page 50

You don't read pages 1 to 49 first. You jump straight there. The book can have 10 pages or 10,000, and it costs the same.

```java
int first = nums[0];          // jump to a position
int count = map.get("apple"); // HashMap jumps to a bucket
```

```ruby
first = nums[0]               # jump to a position
count = map["apple"]          # Hash jumps to a bucket
```

### O(n) · Read a guest list

To check if "Priya" is on an unsorted list, you read names one by one. Twice as many guests means twice as much reading.

```java
for (String name : guests) {
    if (name.equals("Priya")) return true;
}
return false;
```

```ruby
guests.each do |name|
  return true if name == "Priya"
end
false
```

### O(n²) · Everyone shakes hands

Work it out with a small room first:

- **4 people.** Person 1 shakes 3 hands, person 2 has 2 new people left, person 3 has 1, and person 4 has nobody new. 3 + 2 + 1 = **6**.
- **n people.** (n−1) + (n−2) + … + 1 = **n × (n−1) / 2**.
- **100 people.** 100 × 99 / 2 = **4,950**, the answer to the question at the top.

Now drop what doesn't matter: n × (n−1) / 2 = ½n² − ½n. Drop the ½ and the smaller `n` part, and you're left with **O(n²)**.

This is exactly the brute-force code from [Contains Duplicate](../01-hashing/01-contains-duplicate.html): every number "shakes hands" with every other number.

```java
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        // compare nums[i] and nums[j]
    }
}
```

```ruby
(0...n).each do |i|
  (i + 1...n).each do |j|
    # compare nums[i] and nums[j]
  end
end
```

### O(log n) · Cut the book in half

> You have 1,000,000 pages. Each time, you cut the pile in half and keep one half. How many cuts until 1 page is left?
{: .predict}

<details markdown="1">
<summary>Show the answer</summary>

**About 20.** 1,000,000 → 500,000 → 250,000 → … → 1.

| Pages | Cuts needed |
|---|---|
| 1,000 | about 10 |
| 1,000,000 | about 20 |
| 1,000,000,000 | about 30 |

1,000 times more pages costs only 10 more cuts.

</details>

That's all **log n** means here: **how many times you can cut n in half until 1 is left.** You don't need any formula.

Looking up a word in a paper dictionary works this way. Open the middle, decide "my word is in the left half" or "the right half", and throw the other half away. You'll use this as **binary search** in a later topic.

```java
int cuts = 0;
while (n > 1) {
    n = n / 2;
    cuts++;
}
```

```ruby
cuts = 0
while n > 1
  n /= 2
  cuts += 1
end
```

### O(n log n) · Sort cards by merging

How do you sort 8 cards fast? Split them into two piles of 4, then into piles of 2, then into single cards. A single card is already sorted. Now **merge** the piles back together in order.

```text
8 cards                  [ 8 3 5 1 7 2 6 4 ]
split                 [ 8 3 5 1 ]   [ 7 2 6 4 ]
split               [ 8 3 ] [ 5 1 ] [ 7 2 ] [ 6 4 ]
single cards        8  3  5  1  7  2  6  4

merge  (level 1)    [ 3 8 ] [ 1 5 ] [ 2 7 ] [ 4 6 ]      touches 8 cards
merge  (level 2)      [ 1 3 5 8 ]   [ 2 4 6 7 ]          touches 8 cards
merge  (level 3)         [ 1 2 3 4 5 6 7 8 ]             touches 8 cards
```

- How many merge levels? You cut 8 in half until 1 is left: 8 → 4 → 2 → 1, so **3 levels**. That's log n.
- How much work per level? Every card is touched once, so **n**.
- Total: **n × log n** = 8 × 3 = 24 steps.

This method is called **merge sort**. The sorting built into Java (`Arrays.sort`) and Ruby (`sort`) takes O(n log n) on normal inputs.

## See it grow

Move the slider and watch what each Big O needs. Look closely at what happens to O(n²) and O(2ⁿ) as n gets bigger. O(2ⁿ) means "try every possible combination", and you'll meet it in Backtracking.

<div class="growth" id="growth"></div>
<script src="../assets/js/growth.js"></script>

## Reading Big O from code

This checklist sums up what you just worked out. There's nothing new to memorize.

| You see | Picture | Big O |
|---|---|---|
| no loop, just jumps (`nums[i]`, `map.get`) | open the book at a page | O(1) |
| one loop over the input | guest list | O(n) |
| a loop inside a loop, both over the input | handshakes | O(n²) |
| n is cut in half each time | cut the book | O(log n) |
| a sort, or a loop of n with a halving loop inside | merge piles | O(n log n) |

Watch out for **hidden loops**. Some single lines contain a loop inside:

| Java | Ruby | Cost |
|---|---|---|
| `list.contains(x)` on an `ArrayList` | `array.include?(x)` | O(n), it reads the whole list |
| `Arrays.sort(a)` | `array.sort` | O(n log n) |
| `set.contains(x)` on a `HashSet` | `set.include?(x)` on a `Set` | O(1) on average |

## Common wrong ideas

> **"Two loops always mean O(n²)."** Only if one loop is *inside* the other. Two loops *one after another* are n + n = 2n, which is **O(n)**.
{: .warn}

> **"A loop inside a loop is always O(n²)."** Check what the inner loop does. If it always runs 26 times (once per letter), the total is 26n, which is **O(n)**. If it halves each time, it's **O(n log n)**.
{: .warn}

> **"O(1) means fast."** It means *the work doesn't grow with n*. Code that always does 1 million steps is still O(1).
{: .warn}

> **"log n, but log base 2 or base 10?"** It doesn't matter in Big O. log₂ n is always about 3.3 × log₁₀ n, and constant numbers are dropped.
{: .warn}

> **"Two arrays in nested loops are O(n²)."** If the arrays have different sizes a and b, it's **O(a × b)**. Use a different letter for each input.
{: .warn}

> **"Smaller Big O is always faster."** Only for big inputs. For tiny inputs the dropped constants matter. That's why Java's `Arrays.sort` switches to insertion sort, an O(n²) method, for very small arrays: it's faster there.
{: .warn}

## Going deeper: Big O, Big Omega, Big Theta

In 1976, Donald Knuth wrote a short letter called *"Big Omicron and Big Omega and Big Theta"* to fix how these symbols were used:

| Symbol | Meaning | Like saying |
|---|---|---|
| **O(f)** | grows **at most** like f | "this trip takes at most 2 hours" |
| **Ω(f)** | grows **at least** like f | "this trip takes at least 1 hour" |
| **Θ(f)** | grows **exactly** like f (both at most and at least) | "this trip takes between 1 and 2 hours, every time" |

> In interviews, people say "Big O" but usually mean the exact growth (Θ). When you say "this is O(n)", you mean "it grows like n". That's fine, and everyone understands it.
{: .interview}

## Test yourself

From memory first, then open each one.

<details class="q" markdown="1">
<summary>1. Why is O(3n + 5) the same as O(n)?</summary>

The constants (3 and +5) don't change how the work grows: double n and the work still doubles. Big O drops constant numbers.

</details>

<details class="q" markdown="1">
<summary>2. How many handshakes for 10 people? Work it out.</summary>

10 × 9 / 2 = **45**.

</details>

<details class="q" markdown="1">
<summary>3. What does log n mean, without using the word "logarithm"?</summary>

How many times you can cut n in half until 1 is left.

</details>

<details class="q" markdown="1">
<summary>4. Where do the "n" and the "log n" in merge sort's n log n come from?</summary>

log n = the number of merge levels (cutting in half). n = the work on each level (every card is touched once).

</details>

<details class="q" markdown="1">
<summary>5. A loop runs over the array, and inside it calls list.contains(x) on an ArrayList. What is the Big O?</summary>

**O(n²).** `contains` on a list is a hidden loop of n, inside a loop of n. Switch to a `HashSet` and it becomes O(n).

</details>

## Explain it

> Close this page. Draw the five pictures from memory on paper, and for each one write what happens when n doubles. Then check against the cards above.
{: .try}

<div class="review" data-id="complexity-2" data-title="Complexity · Page 2 · Working out Big O"></div>

<div class="pager">
  <a class="prev" href="01-why-complexity.html"><small>Back</small>Page 1 · Why we need it</a>
  <a class="next" href="03-memory-cases-practice.html"><small>Next</small>Page 3 · Memory, cases and practice</a>
</div>
