// Template for BFS on a graph (adjacency list)
void bfs_template(int start_node, int num_nodes, const vector<vector<int>>& adj, function<void(int)> process_node) {
    vector<bool> visited(num_nodes + 1, false); // Assuming 1-based or 0-based indexing handled by num_nodes
    queue<int> q;

    q.push(start_node);
    visited[start_node] = true;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        process_node(u); // Process the current node

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

// -----------------------------

// Simple Example: Finding the shortest path in an unweighted graph
// (Distance from start_node to all other reachable nodes)
// This function returns a vector of distances.
vector<int> bfs_shortest_path_unweighted(int start_node, int num_nodes, const vector<vector<int>>& adj) {
    vector<int> dist(num_nodes + 1, -1); // Initialize distances to -1 (unreachable)
                                        // Adjust size if 0-indexed (num_nodes)
    queue<int> q;

    q.push(start_node);
    dist[start_node] = 0;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v : adj[u]) {
            if (dist[v] == -1) { // If not visited yet
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}
/*
Example Usage for bfs_shortest_path_unweighted:
int N = 5; // Number of nodes
vector<vector<int>> adj(N + 1); // Assuming 1-based indexing for nodes
adj[1] = {2, 3};
adj[2] = {1, 4};
adj[3] = {1, 5};
adj[4] = {2};
adj[5] = {3};
int start_node = 1;
vector<int> distances = bfs_shortest_path_unweighted(start_node, N, adj);
// distances[1] will be 0
// distances[2] will be 1
// distances[3] will be 1
// distances[4] will be 2
// distances[5] will be 2
*/

// -----------------------------

// Complicated Example: Bipartite Graph Check
// A graph is bipartite if its vertices can be divided into two disjoint sets,
// U and V, such that every edge connects a vertex in U to one in V.
// BFS can be used to check this by trying to color the graph with two colors.
bool isBipartite(int num_nodes, const vector<vector<int>>& adj) {
    if (num_nodes == 0) return true;
    vector<int> color(num_nodes + 1, 0); // 0: uncolored, 1: color A, -1: color B
                                         // Adjust size if 0-indexed

    for (int i = 1; i <= num_nodes; ++i) { // Check all components for disconnected graph
        if (color[i] == 0) { // If not colored, start BFS from this node
            queue<int> q;
            q.push(i);
            color[i] = 1; // Assign first color

            while (!q.empty()) {
                int u = q.front();
                q.pop();

                for (int v : adj[u]) {
                    if (color[v] == 0) { // If neighbor is uncolored
                        color[v] = -color[u]; // Assign opposite color
                        q.push(v);
                    } else if (color[v] == color[u]) { // If neighbor has same color
                        return false; // Not bipartite
                    }
                }
            }
        }
    }
    return true;
}
/*
Example Usage for isBipartite:
int N_bipartite = 4;
vector<vector<int>> adj_bipartite(N_bipartite + 1);
adj_bipartite[1] = {2, 4};
adj_bipartite[2] = {1, 3};
adj_bipartite[3] = {2, 4};
adj_bipartite[4] = {1, 3};
// isBipartite(N_bipartite, adj_bipartite) should return true

int N_not_bipartite = 3;
vector<vector<int>> adj_not_bipartite(N_not_bipartite + 1); // Triangle graph
adj_not_bipartite[1] = {2, 3};
adj_not_bipartite[2] = {1, 3};
adj_not_bipartite[3] = {1, 2};
// isBipartite(N_not_bipartite, adj_not_bipartite) should return false
*/