# The doubling experiment.
# Run it: ruby 00-complexity/experiments/doubling.rb
#
# We run each method with n, then 2n, then 4n, and print how much
# slower it got. That ratio tells you the complexity:
#   about 2x every time  -> O(n)
#   about 4x every time  -> O(n^2)

# O(n): look at each number once
def sum_all(nums)
  sum = 0
  nums.each { |x| sum += x }
  sum
end

# O(n^2): look at every pair of numbers
def count_equal_pairs(nums)
  pairs = 0
  (0...nums.length).each do |i|
    (i + 1...nums.length).each do |j|
      pairs += 1 if nums[i] == nums[j]
    end
  end
  pairs
end

def measure(n)
  nums = Array.new(n) { |i| i % 1000 }
  t = Process.clock_gettime(Process::CLOCK_MONOTONIC)
  yield nums
  (Process.clock_gettime(Process::CLOCK_MONOTONIC) - t) * 1000
end

def run(name, start, &work)
  puts name
  previous = nil
  n = start
  3.times do
    ms = measure(n, &work)
    ratio = previous ? format("  -> %.1fx slower", ms / previous) : ""
    puts format("  n = %11s   %8.1f ms%s", n.to_s.reverse.scan(/\d{1,3}/).join(",").reverse, ms, ratio)
    previous = ms
    n *= 2
  end
  puts
end

run("O(n)   sum_all", 2_000_000) { |nums| sum_all(nums) }
run("O(n^2) count_equal_pairs", 1_000) { |nums| count_equal_pairs(nums) }
