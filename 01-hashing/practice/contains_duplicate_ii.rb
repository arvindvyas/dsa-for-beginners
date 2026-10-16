# LeetCode 219 - Contains Duplicate II
# https://leetcode.com/problems/contains-duplicate-ii/
#
# Return true if there are two DIFFERENT indexes i and j where
# nums[i] == nums[j] and (i - j).abs <= k.
#
# Hint: Contains Duplicate asked "have I seen this value?".
#       This one asks "have I seen this value RECENTLY?".
#       What extra thing do you need to remember about each value?

def contains_nearby_duplicate(nums, k)
  # TODO: your solution here
  false
end

def check(nums, k, expected)
  got = contains_nearby_duplicate(nums, k)
  puts "#{got == expected ? 'PASS' : 'FAIL'}  #{nums.inspect}, k=#{k} -> #{got} (expected #{expected})"
end

check([1, 2, 3, 1], 3, true)
check([1, 0, 1, 1], 1, true)
check([1, 2, 3, 1, 2, 3], 2, false)
check([1], 1, false)
check([1, 2, 1], 0, false)
check([4, 1, 2, 3, 1, 5, 4], 2, false)
check([99, 99], 2, true)
