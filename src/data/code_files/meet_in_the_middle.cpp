// Assumes 'vector', 'numeric_limits', 'algorithm' (for sort, lower_bound/upper_bound), 'map' or 'unordered_map' are available.

// General Idea for Meet in the Middle for Subset Sum type problems:
// Problem: Given a set of N numbers, find if there's a subset with sum K, or count such subsets.
// If N is large (e.g., N=40), O(2^N) is too slow.
// Meet in the Middle splits N into N/2 and N - N/2.
// Generates all possible sums for the first half (sums1, size up to 2^(N/2)).
// Generates all possible sums for the second half (sums2, size up to 2^(N - N/2)).
// Then, for each sum `s1` in `sums1`, try to find `K - s1` in `sums2`.

// Helper function to generate all possible subset sums for a given part of the array
void generateSubsetSums(const vector<int>& arr, int start_idx, int end_idx, long long current_sum, vector<long long>& sums_list) {
    if (start_idx > end_idx) {
        sums_list.push_back(current_sum);
        return;
    }

    // Include arr[start_idx]
    generateSubsetSums(arr, start_idx + 1, end_idx, current_sum + arr[start_idx], sums_list);

    // Exclude arr[start_idx]
    generateSubsetSums(arr, start_idx + 1, end_idx, current_sum, sums_list);
}


// Example: Count subsets with sum K using Meet in the Middle
long long countSubsetsWithSumK_MITM(const vector<int>& nums, int k_target_sum) {
    int n = nums.size();
    if (n == 0) {
        return (k_target_sum == 0) ? 1 : 0; // Empty set sum is 0
    }

    vector<long long> sums1, sums2;

    // Generate sums for the first half (0 to n/2 - 1)
    generateSubsetSums(nums, 0, n / 2 - 1, 0, sums1);

    // Generate sums for the second half (n/2 to n - 1)
    generateSubsetSums(nums, n / 2, n - 1, 0, sums2);

    // Sort one of the sum lists for efficient searching (e.g., binary search or two pointers)
    // If counting, using a frequency map for sums2 might be more direct.
    // Or sort sums2 and iterate through sums1.
    sort(sums2.begin(), sums2.end());

    long long count = 0;
    for (long long s1 : sums1) {
        long long required_s2 = (long long)k_target_sum - s1;
        // Find occurrences of required_s2 in sums2
        // lower_bound finds first element >= required_s2
        // upper_bound finds first element > required_s2
        // The distance between them is the count of required_s2
        auto range_start = lower_bound(sums2.begin(), sums2.end(), required_s2);
        auto range_end = upper_bound(sums2.begin(), sums2.end(), required_s2);
        count += distance(range_start, range_end);
    }

    // Special case: if K=0, the empty set from both halves combining (0+0=0)
    // is counted. If the problem definition counts the overall empty set once, adjust.
    // Our generateSubsetSums includes 0 (empty subset sum) for each half.
    // If k_target_sum is 0, one of the counts will be for s1=0 and required_s2=0.
    // This combination {empty_set_from_first_half} + {empty_set_from_second_half} correctly means
    // the overall empty set has sum 0.
    // If the problem statement says "non-empty subset", then if k_target_sum is 0, subtract 1.
    // For "any subset", this is fine.

    return count;
}

// Variation: Find if ANY subset sums to K (boolean result)
bool hasSubsetWithSumK_MITM(const vector<int>& nums, int k_target_sum) {
    int n = nums.size();
     if (n == 0) return k_target_sum == 0;


    vector<long long> sums1, sums2;
    generateSubsetSums(nums, 0, n / 2 - 1, 0, sums1);
    generateSubsetSums(nums, n / 2, n - 1, 0, sums2);

    // For boolean check, can put sums1 into a hash set for O(1) average lookup.
    // Or sort sums2 and binary search.
    sort(sums2.begin(), sums2.end());

    for (long long s1 : sums1) {
        long long required_s2 = (long long)k_target_sum - s1;
        if (binary_search(sums2.begin(), sums2.end(), required_s2)) {
            return true;
        }
    }
    return false;
}

/*
Example Usage for countSubsetsWithSumK_MITM:
vector<int> set_for_mitm = {1, 2, 3, 4, 5, 6, -2, -1}; // n=8
int target_mitm = 7;
long long num_subsets = countSubsetsWithSumK_MITM(set_for_mitm, target_mitm);
// First half {1,2,3,4} -> sums1
// Second half {5,6,-2,-1} -> sums2
// E.g. s1=3 ({1,2}), required_s2 = 4. Check sums2 for 4 (e.g. {5,-1} or {6,-2})

vector<int> set_simple = {1,2,3};
int target_simple = 3;
// countSubsetsWithSumK_MITM(set_simple, target_simple) should be 2 ({1,2} and {3})
// n=3. n/2-1 = 0. first half {1}. sums1 = {0,1}
// n/2=1, n-1=2. second half {2,3}. sums2 = {0,2,3,5}
// Sorted sums2 = {0,2,3,5}
// s1=0: req_s2=3. Found in sums2 (count=1) -> {3}
// s1=1: req_s2=2. Found in sums2 (count=1) -> {1,2}
// Total = 2. Correct.

bool has_sum = hasSubsetWithSumK_MITM(set_for_mitm, target_mitm); // Should be true

vector<int> no_sum_set = {10, 20, 30};
int no_sum_target = 5;
bool no_sum_found = hasSubsetWithSumK_MITM(no_sum_set, no_sum_target); // Should be false
*/