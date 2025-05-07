void dfs_template(int u, const vector<vector<int>>& adj, vector<bool>& visited, function<void(int)> process_node) {
    visited[u] = true;
    process_node(u); // Process the current node (e.g., print, collect)

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs_template(v, adj, visited, process_node);
        }
    }
}

// -----------------------------

// Simple Example: Checking connectivity in a graph
// Given a graph and a starting node, find all reachable nodes.
// (No specific C++ function here as it directly uses the template above)
/*
To use for simple connectivity:
vector<vector<int>> adj = { {1, 2}, {0, 3}, {0}, {1} }; // Example graph
int start_node = 0;
int num_nodes = adj.size();
vector<bool> visited(num_nodes, false);
vector<int> reachable_nodes;

function<void(int)> collect_node = [&](int node_val) {
    reachable_nodes.push_back(node_val);
};

dfs_template(start_node, adj, visited, collect_node);
// reachable_nodes will contain all nodes reachable from start_node
*/


// -----------------------------

// Complicated Example: Finding cycles in an undirected graph
// We need to keep track of the parent to avoid going back immediately to the parent.
bool hasCycle_dfs_util(int u, int parent, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;

    for (int v : adj[u]) {
        if (!visited[v]) {
            if (hasCycle_dfs_util(v, u, adj, visited)) {
                return true;
            }
        } else if (v != parent) {
            // If an adjacent node v is visited and is not the parent of current node u,
            // then there is a cycle.
            return true;
        }
    }
    return false;
}

bool hasCycle(int numNodes, const vector<vector<int>>& adj) {
    if (numNodes == 0) return false;
    vector<bool> visited(numNodes, false);
    for (int i = 0; i < numNodes; ++i) {
        if (!visited[i]) {
            // Start DFS from node i, with no parent (-1)
            if (hasCycle_dfs_util(i, -1, adj, visited)) {
                return true;
            }
        }
    }
    return false;
}

/*
Example Usage for hasCycle:
vector<vector<int>> graph_with_cycle = { {1, 2}, {0, 2}, {0, 1, 3}, {2} };
// Node 0, 1, 2 form a cycle.
bool cycle_exists = hasCycle(graph_with_cycle.size(), graph_with_cycle); // true

vector<vector<int>> graph_without_cycle = { {1}, {0, 2}, {1, 3}, {2} }; // A line graph
bool cycle_not_exists = hasCycle(graph_without_cycle.size(), graph_without_cycle); // false
*/