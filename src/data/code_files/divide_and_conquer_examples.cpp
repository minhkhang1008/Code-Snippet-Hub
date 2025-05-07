// General template for Divide and Conquer algorithms
/*
ResultType solveDivideAndConquer(ProblemInput input) {
    // 1. Base Case: If the problem is small enough, solve it directly.
    if (isSmall(input)) {
        return solveDirectly(input);
    } else {
        // 2. Divide: Break the problem into smaller, independent subproblems.
        SubProblemInput sub1, sub2, ...; // = divide(input);

        // 3. Conquer: Solve the subproblems recursively.
        ResultType result1 = solveDivideAndConquer(sub1);
        ResultType result2 = solveDivideAndConquer(sub2);
        // ...

        // 4. Combine: Combine the solutions of subproblems to get the final solution.
        return combine(result1, result2, ...);
    }
}
*/

// -----------------------------

// Simple Example: Merge Sort
// Sorts an array/vector using the divide and conquer paradigm.
// Assumes 'vector', 'begin', 'end', 'iterator' concepts are available.

// Merge two sorted subarrays arr[l..m] and arr[m+1..r]
void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    // Create temporary arrays
    vector<int> L(n1), R(n2);

    // Copy data to temp arrays L[] and R[]
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]
    int i = 0; // Initial index of first subarray
    int j = 0; // Initial index of second subarray
    int k = l; // Initial index of merged subarray
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        // Base case: if l >= r, the subarray has 0 or 1 element, which is already sorted.
        // Divide: Find the middle point to divide the array into two halves.
        int m = l + (r - l) / 2;

        // Conquer: Sort the two halves recursively.
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        // Combine: Merge the sorted halves.
        merge(arr, l, m, r);
    }
}
/*
Example Usage for mergeSort:
vector<int> my_arr = {12, 11, 13, 5, 6, 7};
mergeSort(my_arr, 0, my_arr.size() - 1);
// my_arr will be {5, 6, 7, 11, 12, 13}
*/

// -----------------------------

// Complicated Example: Quick Select (Find k-th smallest element)
// Uses the partitioning idea from QuickSort (which is also Divide and Conquer).
// Assumes 'vector', 'swap', 'rand' (for random pivot) are available.

// Partition function (like in QuickSort)
// Places pivot at its correct sorted position, elements smaller on left, larger on right.
// Returns index of pivot.
int partition(vector<int>& arr, int l, int r) {
    // Using last element as pivot for simplicity, can be randomized for better average performance
    int pivot_val = arr[r];
    int i = l - 1; // Index of smaller element

    for (int j = l; j < r; j++) {
        if (arr[j] <= pivot_val) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[r]);
    return i + 1;
}

// Randomized partition for better average case performance
int randomizedPartition(vector<int>& arr, int l, int r) {
    if (l == r) return l;
    int random_idx = l + rand() % (r - l + 1);
    swap(arr[random_idx], arr[r]); // Move pivot to end
    return partition(arr, l, r);
}


// Finds the k-th smallest element in arr[l..r]
// k is 0-indexed (i.e., k=0 is smallest, k=n-1 is largest)
int quickSelect(vector<int>& arr, int l, int r, int k) {
    // Base case: If subarray contains only one element
    if (l == r) {
        return arr[l];
    }

    // Divide: Partition the array around a pivot.
    // `pivot_index` is the index where the pivot element is now placed.
    // int pivot_index = partition(arr, l, r); // Using simple partition
    int pivot_index = randomizedPartition(arr, l, r); // Using randomized partition


    // Conquer:
    // If pivot's position is k, then we found the element.
    if (k == pivot_index) {
        return arr[k];
    }
    // If k is smaller than pivot's position, then k-th element is in the left subarray.
    else if (k < pivot_index) {
        return quickSelect(arr, l, pivot_index - 1, k);
    }
    // Else, k-th element is in the right subarray.
    else {
        return quickSelect(arr, pivot_index + 1, r, k);
    }
    // Combine step is implicit: the recursive call returns the answer.
}
/*
Example Usage for quickSelect:
vector<int> data = {10, 4, 5, 8, 6, 11, 26};
int k_val = 2; // Find the 3rd smallest element (0-indexed k=2)
// Expected: 3rd smallest is 6 (4, 5, 6, 8, 10, 11, 26)
int kth_smallest = quickSelect(data, 0, data.size() - 1, k_val); // kth_smallest will be 6

k_val = 0; // Smallest
kth_smallest = quickSelect(data, 0, data.size() - 1, k_val); // kth_smallest will be 4
*/