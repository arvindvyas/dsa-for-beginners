import java.util.*;

public class ContainsDuplicate {

    static boolean bruteForce(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }

    static boolean sorting(int[] nums) {
        int[] copy = nums.clone();
        Arrays.sort(copy);
        for (int i = 1; i < copy.length; i++) {
            if (copy[i] == copy[i - 1]) return true;
        }
        return false;
    }

    static boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int x : nums) {
            if (!seen.add(x)) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        check(new int[]{1, 2, 3, 1}, true);
        check(new int[]{1, 2, 3, 4}, false);
        check(new int[]{1, 1, 1, 3, 3, 4, 3, 2, 4, 2}, true);
        check(new int[]{7}, false);
        check(new int[]{-1, -1}, true);
        check(new int[]{0, 1, -1, 2, -2}, false);
    }

    static void check(int[] nums, boolean expected) {
        boolean[] got = {bruteForce(nums), sorting(nums), containsDuplicate(nums)};
        boolean ok = got[0] == expected && got[1] == expected && got[2] == expected;
        System.out.println((ok ? "PASS" : "FAIL") + "  " + Arrays.toString(nums) + " -> " + Arrays.toString(got) + " (expected " + expected + ")");
    }
}
