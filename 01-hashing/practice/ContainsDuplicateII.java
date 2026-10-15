import java.util.*;

/*
 * LeetCode 219 — Contains Duplicate II
 * https://leetcode.com/problems/contains-duplicate-ii/
 *
 * Return true if there are two DIFFERENT indices i and j such that
 * nums[i] == nums[j] and |i - j| <= k.
 *
 * Hint level 1: Contains Duplicate asked "have I seen this value?".
 *               This one asks "have I seen this value RECENTLY?".
 *               What extra thing do you need to remember about each value?
 */
public class ContainsDuplicateII {

    static boolean containsNearbyDuplicate(int[] nums, int k) {
        // TODO: your solution here
        return false;
    }

    public static void main(String[] args) {
        check(new int[]{1, 2, 3, 1}, 3, true);
        check(new int[]{1, 0, 1, 1}, 1, true);
        check(new int[]{1, 2, 3, 1, 2, 3}, 2, false);
        check(new int[]{1}, 1, false);
        check(new int[]{1, 2, 1}, 0, false);
        check(new int[]{4, 1, 2, 3, 1, 5, 4}, 2, false);
        check(new int[]{99, 99}, 2, true);
    }

    static void check(int[] nums, int k, boolean expected) {
        boolean got = containsNearbyDuplicate(nums, k);
        System.out.println((got == expected ? "PASS" : "FAIL") + "  " + Arrays.toString(nums) + ", k=" + k + " -> " + got + " (expected " + expected + ")");
    }
}
