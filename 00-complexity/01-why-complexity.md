# Page 1 · Why we need complexity

The story behind Big O, and the one question it answers.
{: .lead}

> A program takes **1 second** for 1,000 items. How long will it take for **1,000,000** items?
>
> Write down your guess before you open the answer.
{: .predict}

<details markdown="1">
<summary>Show the answer</summary>

**You can't know yet.** It depends on how the work grows:

- If the work grows like the input, it takes about **17 minutes** (1,000× more items, 1,000× more time).
- If every item is compared with every other item, it takes about **12 days** (1,000,000× more time).
- If the program cuts the problem in half again and again, it takes about **2 seconds**.

Same program speed, three very different answers. Knowing *how the work grows* is exactly what complexity tells you.

</details>

## Two programs, one task

A shop has **1 million customer emails** and wants to know if any email appears twice. Two developers write a program.

- **Dev A** compares every email with every other email.
- **Dev B** puts each email into a `HashSet` and checks "have I seen this one before?" (you'll learn this in [Hashing](../01-hashing/)).

Dev A's program is slow, so Dev A buys a computer that is **100 times faster**.

| | Dev A | Dev B |
|---|---|---|
| Method | compare every pair | HashSet |
| Steps needed | about 500 billion | about 1 million |
| Computer speed | 1 billion steps/s (fast) | 10 million steps/s (100× slower) |
| **Time** | **about 8 minutes** | **0.1 seconds** |

Dev B wins by a huge margin, on a computer that is 100 times slower.

> **A better method beats a faster computer.** Faster hardware gives you a fixed speedup. A better method gives you a speedup that keeps getting bigger as the input grows.
{: .tip}

## Why not just measure the time?

"My code took 2 seconds" sounds useful, but it changes with:

- **The machine:** a laptop, a phone and a server give different numbers.
- **The language:** the same idea in Java usually runs faster than in Ruby.
- **What else is running:** a browser with 50 tabs open slows everything down.
- **The input:** 10 items or 10 million items.

So computer scientists stopped asking "how many seconds?" and started asking:

**"How many steps does it take, and how does that number grow when the input gets bigger?"**

That answer is the same on every machine and in every language.

## A short history

The idea is very old. People have counted the steps of an algorithm for almost 200 years.

<ul class="timeline">
  <li><span class="year">about 300 BC</span><span class="who">Euclid</span> writes down a method to find the greatest common divisor of two numbers. It's one of the oldest algorithms still in use.</li>
  <li><span class="year">about 820 AD</span><span class="who">Al-Khwarizmi</span>, a Persian mathematician, writes books on arithmetic. The word <b>algorithm</b> comes from the Latin form of his name.</li>
  <li><span class="year">1844</span><span class="who">Gabriel Lamé</span> proves that Euclid's method never needs more than <b>5 × (number of digits)</b> steps. This is often called the first analysis of how much work an algorithm needs. Notice that he didn't measure time. He counted steps, and he described them by how they grow with the size of the input.</li>
  <li><span class="year">1894</span><span class="who">Paul Bachmann</span>, a German mathematician, writes <b>O(…)</b> to mean "grows no faster than". The O stands for <i>Ordnung</i>, German for "order".</li>
  <li><span class="year">1909</span><span class="who">Edmund Landau</span> uses the notation widely in his books, so it is also called <b>Landau notation</b>.</li>
  <li><span class="year">1965</span><span class="who">Juris Hartmanis and Richard Stearns</span> publish "On the Computational Complexity of Algorithms" and start the field of complexity theory. Computers were slow and very expensive then, so every wasted step cost real money. They won the 1993 Turing Award, the top prize in computer science, for this work.</li>
  <li><span class="year">1968–1976</span><span class="who">Donald Knuth</span> brings step counting to everyday programmers with <i>The Art of Computer Programming</i>. In 1976 he also sets the meaning of Big O, Big Omega and Big Theta for computer science (see <a href="02-finding-big-o.html#going-deeper-big-o-big-omega-big-theta">page 2</a>).</li>
</ul>

> From Lamé to your next interview, the idea hasn't changed: **count the steps and watch how the count grows.**
{: .tip}

## The one big idea

Big O answers one question:

**"If the input gets bigger, how much more work is needed?"**

The easiest way to feel it is the **doubling question**: *if n becomes 2n, what happens to the work?*

| Big O | When n doubles, the work… | Picture (explained on page 2) |
|---|---|---|
| O(1) | stays the same | open a book at page 50 |
| O(log n) | grows by just **one** step | cut a book in half, again and again |
| O(n) | **doubles** | read a guest list, name by name |
| O(n log n) | a bit more than doubles | sort a deck of cards by merging |
| O(n²) | becomes **4×** | everyone in a room shakes hands |

> Remember the doubling question, not the table. You can rebuild the table from it at any time, and on page 3 you'll measure it on your own computer.
{: .tip}

## Test yourself

Answer each question **from memory**, out loud or on paper. Only then open it.

<details class="q" markdown="1">
<summary>1. Why don't we describe an algorithm's speed in seconds?</summary>

Seconds change with the machine, the language, what else is running, and the input size. Step counts, and how they grow, stay the same everywhere.

</details>

<details class="q" markdown="1">
<summary>2. What single question does Big O answer?</summary>

If the input gets bigger, how much more work is needed?

</details>

<details class="q" markdown="1">
<summary>3. Some O(n²) code takes 1 second for n = 1,000. About how long for n = 2,000?</summary>

About **4 seconds**. When n doubles, n² becomes 4×.

</details>

<details class="q" markdown="1">
<summary>4. Who first proved a limit on the number of steps an algorithm needs, and for which algorithm?</summary>

Gabriel Lamé, in 1844, for Euclid's greatest common divisor method: at most 5 × the number of digits.

</details>

<details class="q" markdown="1">
<summary>5. Can a 100× faster computer running an O(n²) method beat a slow computer running an O(n) method?</summary>

Only for small inputs. As n grows, the O(n²) work grows much faster, and no fixed speedup can keep up.

</details>

## Explain it

> Explain to a friend, in 3 sentences and **without the words "Big O"**, why buying a faster computer doesn't fix a slow method. If you can't, reread "Two programs, one task".
{: .try}

<div class="review" data-id="complexity-1" data-title="Complexity · Page 1 · Why we need it"></div>

<div class="pager">
  <a class="prev" href="./"><small>Back</small>Complexity overview</a>
  <a class="next" href="02-finding-big-o.html"><small>Next</small>Page 2 · Working out Big O</a>
</div>
