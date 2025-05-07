// Represents an edge with a destination node and its weight
struct Edge {
    int to;
    long long weight;
};

// Represents a state in the priority queue: {distance, node_id}
// Using pair for priority queue, first element is used for sorting (distance)
// We want min-priority queue, so either store negative distances or use greater<pair<long long, int>>
using PQElement = pair<long long, int>;

// Dijkstra's algorithm
// n_nodes: number of nodes in the graph (assuming nodes are 0 to n_nodes-1 or 1 to n_nodes)
// adj: adjacency list, where adj[u] is a vector of Edges from node u
// start_node: the source node
// Returns a vector of shortest distances from start_node to all other nodes.
vector<long long> dijkstra(int n_nodes, const vector<vector<Edge>>& adj, int start_node) {
    // dist[i] will hold the shortest distance from start_node to node i
    vector<long long> dist(n_nodes);
    for(int i=0; i<n_nodes; ++i) {
        dist[i] = -1; // Using -1 to represent infinity or unvisited, common in competitive programming.
                      // Or use numeric_limits<long long>::max() and check against it.
                      // Let's use a very large number for this example, assuming non-negative weights.
        dist[i] = 9e18; // A large number representing infinity
    }


    dist[start_node] = 0;

    // Min-priority queue to store {distance, node_id}
    // Stores pairs: (distance, vertex)
    // `greater` makes it a min-priority queue (smallest distance on top)
    priority_queue<PQElement, vector<PQElement>, greater<PQElement>> pq;
    pq.push({0, start_node});

    while (!pq.empty()) {
        long long d = pq.top().first; // Current shortest distance to u
        int u = pq.top().second;    // Node u
        pq.pop();

        // If we found a shorter path to u already, skip this one
        // This check is important if multiple entries for the same node exist in PQ
        // with different (older, larger) distances.
        if (d > dist[u]) {
            continue;
        }

        // Explore neighbors of u
        for (const Edge& edge : adj[u]) {
            int v = edge.to;
            long long weight_uv = edge.weight;

            // If a shorter path to v through u is found
            if (dist[u] + weight_uv < dist[v]) {
                dist[v] = dist[u] + weight_uv;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

/*
Example Usage for dijkstra:
int num_nodes = 5; // Nodes 0 to 4
vector<vector<Edge>> adjacency_list(num_nodes);

// Add edges: {destination_node, weight}
adjacency_list[0].push_back({1, 4});
adjacency_list[0].push_back({2, 1});
adjacency_list[1].push_back({3, 1});
adjacency_list[2].push_back({1, 2});
adjacency_list[2].push_back({3, 5});
adjacency_list[3].push_back({4, 3});
// No outgoing edges from node 4 in this example

int source_node = 0;
vector<long long> shortest_paths = dijkstra(num_nodes, adjacency_list, source_node);

// shortest_paths will be:
// dist[0] = 0
// dist[1] = 3 (0 -> 2 -> 1, cost 1+2=3)
// dist[2] = 1 (0 -> 2, cost 1)
// dist[3] = 4 (0 -> 2 -> 1 -> 3, cost 1+2+1=4)
// dist[4] = 7 (0 -> 2 -> 1 -> 3 -> 4, cost 1+2+1+3=7)

// If using 1-based indexing for nodes, adjust vector sizes and loops (e.g., n_nodes + 1)
*/