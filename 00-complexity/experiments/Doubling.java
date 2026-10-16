/*
 * The doubling experiment.
 * Run it: java 00-complexity/experiments/Doubling.java
 *
 * We run each method with n, then 2n, then 4n, and print how much
 * slower it got. That ratio tells you the complexity:
 *   about 2x every time  -> O(n)
 *   about 4x every time  -> O(n^2)
 */
public class Doubling {

    // O(n): look at each number once
    static long sumAll(int[] nums) {
        long sum = 0;
        for (int x : nums) {
            sum += x;
        }
        return sum;
    }

    // O(n^2): look at every pair of numbers
    static long countEqualPairs(int[] nums) {
        long pairs = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) pairs++;
            }
        }
        return pairs;
    }

    public static void main(String[] args) {
        System.out.println("O(n)   sumAll");
        run(true, 20_000_000);
        System.out.println();
        System.out.println("O(n^2) countEqualPairs");
        run(false, 10_000);
    }

    static void run(boolean linear, int start) {
        for (int i = 0; i < 5; i++) measure(linear, start);   // warm-up: Java speeds code up while it runs
        double previous = 0;
        for (int n = start; n <= start * 4; n *= 2) {
            double ms = measure(linear, n);
            String ratio = previous == 0 ? "" : String.format("  -> %.1fx slower", ms / previous);
            System.out.printf("  n = %,11d   %8.1f ms%s%n", n, ms, ratio);
            previous = ms;
        }
    }

    // runs 3 times and keeps the fastest, to hide random noise
    static double measure(boolean linear, int n) {
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = i % 1000;
        double best = Double.MAX_VALUE;
        for (int run = 0; run < 3; run++) {
            long t = System.nanoTime();
            long result = linear ? sumAll(nums) : countEqualPairs(nums);
            best = Math.min(best, (System.nanoTime() - t) / 1e6);
            if (result == -1) System.out.println();   // keeps Java from skipping the work
        }
        return best;
    }
}
