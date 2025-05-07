// Template for generating subsets recursively (Backtracking)
void generateSubsetsRecursive_template(
    const vector<int>& original_set,
    int index,
    vector<int>& current_subset,
    vector<vector<int>>& all_subsets // To store all generated subsets
    // Or use a callback: function<void(const vector<int>&)> process_subset
) {
    // Base case: If we have considered all elements
    if (index == original_set.size()) {
        all_subsets.push_back(current_subset);
        // process_subset(current_subset); // If using a callback
        return;
    }

    // Decision 1: Include the current element (original_set[index])
    current_subset.push_back(original_set[index]);
    generateSubsetsRecursive_template(original_set, index + 1, current_subset, all_subsets);
    current_subset.pop_back(); // Backtrack: remove the element to explore the other choice

    // Decision 2: Exclude the current element (original_set[index])
    generateSubsetsRecursive_template(original_set, index + 1, current_subset, all_subsets);
}

// -----------------------------

// Simple Example: Print all subsets of a given set of numbers
// This directly uses the template logic within a wrapper.
void printAllSubsets(const vector<int>& nums) {
    vector<int> current_subset;
    vector<vector<int>> all_subsets_result; // Collects all subsets

    // Local recursive helper or pass a lambda/function to the template
    function<void(int, vector<int>&)> generate =
        [&](int idx, vector<int>& current) {
        if (idx == nums.size()) {
            // Process the found subset (e.g., print it or add to a list)
            // For printing:
            // cout << "{ ";
            // for (int val : current) cout << val << " ";
            // cout << "}" << endl;
            all_subsets_result.push_back(current); // Storing for demonstration
            return;
        }

        // Include nums[idx]
        current.push_back(nums[idx]);
        generate(idx + 1, current);
        current.pop_back(); // Backtrack

        // Exclude nums[idx]
        generate(idx + 1, current);
    };

    generate(0, current_subset);

    // At this point, all_subsets_result contains all subsets.
    // You can then iterate and print them or return all_subsets_result.
    // For example, to print them now:
    /*
    for (const auto& subset : all_subsets_result) {
        cout << "{ ";
        for (int val : subset) {
            cout << val << " ";
        }
        cout << "}" << endl;
    }
    */
}
/*
Example Usage for printAllSubsets:
vector<int> my_set = {1, 2, 3};
printAllSubsets(my_set);
// Output (order may vary, collected in all_subsets_result for this example):
// { 1 2 3 }
// { 1 2 }
// { 1 3 }
// { 1 }
// { 2 3 }
// { 2 }
// { 3 }
// { }
*/

// -----------------------------

// "Complicated" Example: Find all subsets that sum up to a target value K
// (Subset Sum Problem - decision version, listing all such subsets)
void findSubsetsWithSumK_recursive(
    const vector<int>& nums,
    int target_sum,
    int index,
    int current_sum,
    vector<int>& current_subset,
    vector<vector<int>>& result_subsets
) {
    // Base case: If target sum is met
    if (current_sum == target_sum) {
        result_subsets.push_back(current_subset);
        // Important: Do not return here if elements can be 0 or negative,
        // or if multiple elements can lead to the same sum further down.
        // For positive numbers and seeking exact sum, often okay to stop further exploration on this path
        // unless multiple combinations of remaining elements (like zeros) are allowed.
        // For this specific problem, once sum is K, this path is a solution.
        // We might want to continue if there are more elements to consider for OTHER subsets.
    }

    // Base case: If all elements are processed or current_sum exceeds target (for positive numbers)
    if (index == nums.size() || (current_sum > target_sum && target_sum >= 0) ) { // Optimization for positive numbers
        return;
    }
     if (current_sum == target_sum && target_sum >= 0) { // If sum is already met and we are looking for exact match
         // This ensures we don't add more elements if we already hit the target.
         // But we must continue to explore other branches from previous states.
         // The return here should be reconsidered if elements can be zero or negative.
         // Let's refine: if sum is met, we add it. Then we continue to find other subsets.
         // The condition (current_sum > target_sum) handles pruning for positive numbers.
     }


    // Decision 1: Include nums[index]
    if (nums[index] + current_sum <= target_sum || target_sum < 0) { // Check before adding if positive target
        current_subset.push_back(nums[index]);
        findSubsetsWithSumK_recursive(nums, target_sum, index + 1, current_sum + nums[index], current_subset, result_subsets);
        current_subset.pop_back(); // Backtrack
    }


    // Decision 2: Exclude nums[index]
    // This path is always taken to explore subsets without the current element,
    // unless some other pruning condition specific to the problem is met.
    findSubsetsWithSumK_recursive(nums, target_sum, index + 1, current_sum, current_subset, result_subsets);
}

vector<vector<int>> getSubsetsWithSumK(const vector<int>& nums, int target_sum) {
    vector<vector<int>> result_subsets;
    vector<int> current_subset;
    // To handle duplicates in nums leading to duplicate subsets, sort nums first
    // and add a check in the recursive function:
    // if (i > index && nums[i] == nums[i-1]) continue; when looping or making choices.
    // For this general version, we assume distinct elements or distinct subsets are fine.
    findSubsetsWithSumK_recursive(nums, target_sum, 0, 0, current_subset, result_subsets);
    return result_subsets;
}
/*
Example Usage for getSubsetsWithSumK:
vector<int> num_set = {2, 4, 6, 10};
int k_sum = 16;
vector<vector<int>> sum_subsets = getSubsetsWithSumK(num_set, k_sum);
// sum_subsets should contain:
// {6, 10}
// {2, 4, 10} (if elements can be re-used or if index + 1 is used as in the code, no re-use from same index)

vector<int> num_set_2 = {1, 2, 3, 4, 5};
int k_sum_2 = 7;
vector<vector<int>> sum_subsets_2 = getSubsetsWithSumK(num_set_2, k_sum_2);
// {2, 5}
// {3, 4}
// {1, 2, 4}
*/