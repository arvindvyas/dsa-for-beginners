import java.util.*;

public class ContainsDuplicate {

    static boolean containsDuplicate(int[] nums) {
        // TODO: your solution here
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
        boolean got = containsDuplicate(nums);
        String mark = got == expected ? "PASS" : "FAIL";
        System.out.println(mark + "  " + Arrays.toString(nums) + " -> " + got + " (expected " + expected + ")");
    }
}
