// Bit handling isn't a single algorithm but a collection of techniques.
// These are fundamental operations.
// Assumes basic integer types are available.

// Function to get the k-th bit of a number n (0-indexed from right)
// Returns 1 if k-th bit is set, 0 otherwise.
int getKthBit(int n, int k) {
    return (n >> k) & 1;
}

// Function to set the k-th bit of a number n
// Returns the number n with k-th bit set.
int setKthBit(int n, int k) {
    return n | (1 << k);
}

// Function to clear the k-th bit of a number n
// Returns the number n with k-th bit cleared.
int clearKthBit(int n, int k) {
    return n & (~(1 << k));
}

// Function to toggle the k-th bit of a number n
// Returns the number n with k-th bit toggled.
int toggleKthBit(int n, int k) {
    return n ^ (1 << k);
}

// Function to count the number of set bits (1s) in an integer
// (Brian Kernighan's Algorithm)
int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1); // Clears the least significant set bit
        count++;
    }
    return count;
}
// In C++20, you can use std::popcount(unsigned_int_type)

// Function to check if a number is a power of two
bool isPowerOfTwo(int n) {
    if (n <= 0) return false;
    return (n & (n - 1)) == 0;
}

// -----------------------------

// Simple Example: Check if a number is even or odd
bool isOdd(int n) {
    // An odd number has its least significant bit (LSB) set to 1.
    return (n & 1) == 1;
}
bool isEven(int n) {
    return (n & 1) == 0;
}
/*
Example Usage for isOdd/isEven:
bool check_odd = isOdd(5); // true
bool check_even = isEven(4); // true
*/

// -----------------------------

// "Complicated" Example: Generating all subsets of a set {0, 1, ..., n-1}
// Each integer from 0 to 2^n - 1 represents a unique subset.
// If the j-th bit of an integer `i` is set, then element `j` is in the subset represented by `i`.
// Assumes 'vector' is available.
vector<vector<int>> generateAllSubsets(int n_elements) {
    vector<vector<int>> all_subsets;
    int num_subsets = 1 << n_elements; // 2^n_elements subsets

    for (int i = 0; i < num_subsets; ++i) {
        vector<int> current_subset;
        for (int j = 0; j < n_elements; ++j) {
            // Check if the j-th bit is set in i
            if ((i >> j) & 1) {
                current_subset.push_back(j); // Add element j to the current subset
            }
        }
        all_subsets.push_back(current_subset);
    }
    return all_subsets;
}
/*
Example Usage for generateAllSubsets:
int set_size = 3; // Elements {0, 1, 2}
vector<vector<int>> subsets = generateAllSubsets(set_size);
// subsets will contain:
// {}
// {0}
// {1}
// {0, 1}
// {2}
// {0, 2}
// {1, 2}
// {0, 1, 2}
// (Order might vary depending on inner loop or if j iterates differently)
*/

// Another "Complicated" Example: Finding the unique number in an array
// where every other number appears twice.
// XORing all numbers will result in the unique number because x ^ x = 0 and x ^ 0 = x.
int findUniqueNumber(const vector<int>& nums) {
    int unique_val = 0;
    for (int num : nums) {
        unique_val ^= num;
    }
    return unique_val;
}
/*
Example Usage for findUniqueNumber:
vector<int> arr_unique = {2, 3, 5, 4, 5, 3, 2};
int unique = findUniqueNumber(arr_unique); // unique will be 4
*/