// General structure/idea for a Greedy Algorithm function:
// (This is highly problem-dependent, so a strict template is hard)
/*
ReturnType solveGreedyProblem(ProblemInputType input) {
    // 1. Initialize solution structure
    SolutionStructure solution;

    // 2. Make a greedy choice:
    //    Often involves sorting the input or using a priority queue
    //    to easily pick the "best" local option at each step.
    //    while (problem_not_fully_solved && choices_available) {
    //        CurrentChoice choice = selectGreedily(input, current_state);
    //
    //        // 3. Check if choice is valid/feasible
    //        if (isValid(choice, solution)) {
    //            // 4. Add choice to solution
    //            addToSolution(solution, choice);
    //            updateState(input, current_state, choice); // e.g., remove chosen item
    //        } else {
    //            // Optional: handle invalid choice (e.g., discard, try another)
    //        }
    //    }
    // 5. Return solution
    return solution;
}
*/

// Represents an activity with start and finish times
struct Activity {
    int id;
    int start;
    int finish;
};

// Comparison function for sorting activities by finish times
bool compareActivities(const Activity& a, const Activity& b) {
    return a.finish < b.finish;
}

// -----------------------------

// Simple Example: Activity Selection Problem
// Given a set of activities with start and finish times, select the maximum
// number of non-overlapping activities that can be performed by a single person.
// Assumes 'vector', 'sort', 'Activity' struct, 'compareActivities' are available.
vector<Activity> selectActivities(vector<Activity>& activities) {
    vector<Activity> selected_activities;
    if (activities.empty()) {
        return selected_activities;
    }

    // Greedy choice: Sort activities by their finish times in ascending order.
    sort(activities.begin(), activities.end(), compareActivities);

    // Select the first activity
    selected_activities.push_back(activities[0]);
    int last_finish_time = activities[0].finish;

    // Iterate through the remaining activities
    for (size_t i = 1; i < activities.size(); ++i) {
        // If the current activity starts after or at the same time the previous one finished
        if (activities[i].start >= last_finish_time) {
            selected_activities.push_back(activities[i]);
            last_finish_time = activities[i].finish;
        }
    }
    return selected_activities;
}
/*
Example Usage for selectActivities:
vector<Activity> acts = {
    {1, 1, 4}, {2, 3, 5}, {3, 0, 6},
    {4, 5, 7}, {5, 3, 9}, {6, 5, 9},
    {7, 6, 10}, {8, 8, 11}, {9, 8, 12},
    {10, 2, 14}, {11, 12, 16}
};
vector<Activity> result = selectActivities(acts);
// Result might be activities with ids (depending on original order after sort): e.g. 1, 4, 8, 11 (or their new indices)
// The key is the number of activities and that they don't overlap.
// For {{1,1,4}, {2,3,5}, {3,0,6}, {4,5,7}, {5,3,9}, {6,5,9}, {7,6,10}, {8,8,11}, {9,8,12}, {10,2,14}, {11,12,16}}
// Sorted by finish: {1,1,4}, {2,3,5}, {3,0,6}, {4,5,7}, {6,5,9}, {5,3,9},{7,6,10}, {8,8,11}, {9,8,12}, {10,2,14}, {11,12,16}
// Output: Activity {1,1,4}, Activity {4,5,7}, Activity {8,8,11}, Activity {11,12,16}
*/

// -----------------------------

// Complicated Example: Huffman Coding (Building the Huffman Tree)
// Given characters and their frequencies, build a Huffman tree for prefix codes.
// Assumes 'string', 'vector', 'queue', 'map', 'algorithm' (for sort/heap) are available.
// Node for Huffman Tree
struct MinHeapNode {
    char data;             // Character
    unsigned freq;         // Frequency of the character
    MinHeapNode *left, *right; // Left and right child

    MinHeapNode(char data, unsigned freq) {
        left = right = nullptr;
        this->data = data;
        this->freq = freq;
    }
};

// Comparison structure for min-heap
struct compareMinHeapNodes {
    bool operator()(MinHeapNode* l, MinHeapNode* r) {
        return l->freq > r->freq;
    }
};

// Function to build Huffman Tree and return the root
// This focuses on building the tree. Generating codes is a traversal from the root.
MinHeapNode* buildHuffmanTree(const vector<char>& data, const vector<unsigned>& freq) {
    if (data.size() != freq.size() || data.empty()) {
        return nullptr; // Or handle error appropriately
    }

    priority_queue<MinHeapNode*, vector<MinHeapNode*>, compareMinHeapNodes> minHeap;

    // Create a leaf node for each character and add it to the min-heap
    for (size_t i = 0; i < data.size(); ++i) {
        minHeap.push(new MinHeapNode(data[i], freq[i]));
    }

    // Iterate while size of heap doesn't become 1
    while (minHeap.size() > 1) {
        // Extract the two minimum frequency nodes from min heap
        MinHeapNode *left = minHeap.top();
        minHeap.pop();

        MinHeapNode *right = minHeap.top();
        minHeap.pop();

        // Create a new internal node with frequency equal to the
        // sum of the two nodes' frequencies. Make the two extracted
        // nodes as left and right children of this new node.
        // '$' is a special value for internal nodes, not representing a character.
        MinHeapNode *top = new MinHeapNode('$', left->freq + right->freq);
        top->left = left;
        top->right = right;

        // Add this node to the min-heap
        minHeap.push(top);
    }

    // The remaining node is the root node and the tree is complete.
    return minHeap.top();
}

// Helper function to print codes from Huffman Tree (for demonstration)
void printHuffmanCodes(MinHeapNode* root, string str, map<char, string>& huffmanCode) {
    if (!root) return;

    if (root->data != '$') { // Leaf node
        huffmanCode[root->data] = str;
    }

    printHuffmanCodes(root->left, str + "0", huffmanCode);
    printHuffmanCodes(root->right, str + "1", huffmanCode);
}

/*
Example Usage for Huffman Coding:
vector<char> chars = {'a', 'b', 'c', 'd', 'e', 'f'};
vector<unsigned> freqs = {5, 9, 12, 13, 16, 45};
MinHeapNode* huffman_root = buildHuffmanTree(chars, freqs);

map<char, string> codes;
if (huffman_root) {
    printHuffmanCodes(huffman_root, "", codes);
}
// Output codes (example, actual codes depend on tie-breaking in priority queue):
// f: 0
// c: 100
// d: 101
// a: 1100
// b: 1101
// e: 111

// Don't forget to deallocate the tree nodes if new MinHeapNode was used.
// void deleteHuffmanTree(MinHeapNode* node) { ... }
*/