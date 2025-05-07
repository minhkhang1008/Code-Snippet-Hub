// Assumes 'vector', 'numeric' (for iota, optional) are available.
struct DSU {
    vector<int> parent;
    vector<int> set_size; // Optional: for union by size/rank optimization

    // Constructor: initializes n disjoint sets (0 to n-1 or 1 to n)
    DSU(int n) {
        parent.resize(n);
        //iota(parent.begin(), parent.end(), 0); // Each element is its own parent initially
        for(int i=0; i<n; ++i) parent[i] = i;


        set_size.assign(n, 1); // Each set initially has size 1
    }

    // Find operation with path compression
    // Returns the representative (root) of the set containing element i
    int find(int i) {
        if (parent[i] == i) {
            return i;
        }
        // Path compression: make all nodes on the path point directly to the root
        return parent[i] = find(parent[i]);
    }

    // Union operation with union by size (or rank)
    // Merges the set containing element i and the set containing element j
    // Returns true if they were in different sets and are now merged, false otherwise.
    bool unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);

        if (root_i != root_j) {
            // Union by size: attach smaller tree under root of larger tree
            if (set_size[root_i] < set_size[root_j]) {
                swap(root_i, root_j); // Ensure root_i is the larger set
            }
            parent[root_j] = root_i;
            set_size[root_i] += set_size[root_j];
            return true;
        }
        return false; // Already in the same set
    }

    // Optional: Check if two elements are in the same set
    bool sameSet(int i, int j) {
        return find(i) == find(j);
    }

    // Optional: Get the size of the set containing element i
    int getSize(int i) {
        return set_size[find(i)];
    }
};

/*
Example Usage for DSU:
int num_elements = 5; // Elements 0 to 4
DSU dsu_instance(num_elements);

// dsu_instance.unite(0, 1); // Merge set of 0 and set of 1
// dsu_instance.unite(1, 2); // Merge set of 1 (now {0,1}) and set of 2. Result: {0,1,2}
// bool check1 = dsu_instance.sameSet(0, 2); // true
// bool check2 = dsu_instance.sameSet(0, 3); // false

// dsu_instance.unite(3, 4); // Merge set of 3 and set of 4. Result: {3,4}
// bool check3 = dsu_instance.sameSet(0, 3); // false (still different main sets {0,1,2} and {3,4})

// int size_of_set0 = dsu_instance.getSize(0); // 3
// int size_of_set3 = dsu_instance.getSize(3); // 2

// dsu_instance.unite(0, 4); // Merge {0,1,2} and {3,4}. Result: {0,1,2,3,4}
// bool check4 = dsu_instance.sameSet(1, 3); // true
// int size_of_set_all = dsu_instance.getSize(0); // 5
*/