require 'set'

def brute_force(nums)
  (0...nums.length).each do |i|
    (i + 1...nums.length).each do |j|
      return true if nums[i] == nums[j]
    end
  end
  false
end

def sorting(nums)
  sorted = nums.sort
  (1...sorted.length).each do |i|
    return true if sorted[i] == sorted[i - 1]
  end
  false
end

def contains_duplicate(nums)
  seen = Set.new
  nums.each do |x|
    return true unless seen.add?(x)
  end
  false
end

def check(nums, expected)
  got = [brute_force(nums), sorting(nums), contains_duplicate(nums)]
  ok = got.all? { |g| g == expected }
  puts "#{ok ? 'PASS' : 'FAIL'}  #{nums.inspect} -> #{got.inspect} (expected #{expected})"
end

check([1, 2, 3, 1], true)
check([1, 2, 3, 4], false)
check([1, 1, 1, 3, 3, 4, 3, 2, 4, 2], true)
check([7], false)
check([-1, -1], true)
check([0, 1, -1, 2, -2], false)
