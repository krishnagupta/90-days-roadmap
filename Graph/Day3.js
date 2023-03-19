// Dijkstra Algorithm Needed to solve Network delay problem or BFS

/**
 * BFS
 * traverse graph and update distance values
 * find max distance (if all nodes are traversal)
 * TC O(V+E)
 */

// ================================================================================================= //

/**
 * Dijkstra Algorithm
 * 
 * Mark all vertices as unvisited initially
 * Mark all nodes with infinite distance initially except source node
 * Repeat the following for (v-1) times
 *   pick the min value node which is unprocessed
 *   mark the node as processed (u -> v)
 *    if cost[u] + wt[uv] < cost[v] update
 *    else skip
 */

// A Javascript program for Dijkstra's single
// source shortest path algorithm.
// The program is for adjacency matrix
// representation of the graph    
let V = 9;
 
// A utility function to find the
// vertex with minimum distance
// value, from the set of vertices
// not yet included in shortest
// path tree
function minDistance(dist,sptSet)
{
     
    // Initialize min value
    let min = Number.MAX_VALUE;
    let min_index = -1;
     
    for(let v = 0; v < V; v++)
    {
        if (sptSet[v] == false && dist[v] <= min)
        {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}
 
// A utility function to print
// the constructed distance array
function printSolution(dist)
{
    // document.write("Vertex \t\t Distance from Source<br>");
    // for(let i = 0; i < V; i++)
    // {
    //     document.write(i + " \t\t " +
    //              dist[i] + "<br>");
    // }
}
 
// Function that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
function dijkstra(graph, src)
{
    let dist = new Array(V);
    let sptSet = new Array(V);
     
    // Initialize all distances as
    // INFINITE and stpSet[] as false
    for(let i = 0; i < V; i++)
    {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }
     
    // Distance of source vertex
    // from itself is always 0
    dist[src] = 0;
     
    // Find shortest path for all vertices
    for(let count = 0; count < V - 1; count++)
    {
         
        // Pick the minimum distance vertex
        // from the set of vertices not yet
        // processed. u is always equal to
        // src in first iteration.
        let u = minDistance(dist, sptSet);
         
        // Mark the picked vertex as processed
        sptSet[u] = true;
         
        // Update dist value of the adjacent
        // vertices of the picked vertex.
        for(let v = 0; v < V; v++)
        {
             
            // Update dist[v] only if is not in
            // sptSet, there is an edge from u
            // to v, and total weight of path
            // from src to v through u is smaller
            // than current value of dist[v]
            if (!sptSet[v] && graph[u][v] != 0 &&
                   dist[u] != Number.MAX_VALUE &&
                   dist[u] + graph[u][v] < dist[v])
            {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
     
    // Print the constructed distance array
    printSolution(dist);
}
 
// Driver code
let graph = [ [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
              [ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
              [ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
              [ 0, 0, 7, 0, 9, 14, 0, 0, 0],
              [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
              [ 0, 0, 4, 14, 10, 0, 2, 0, 0],
              [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
              [ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
              [ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ]
dijkstra(graph, 0);

// ================================================================================================= //


/**
 * 743. Network Delay Time
 */

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
    let graph = {}, costs = {}, parents = {}, processed = {}, processedCounter = 0;

    // Adjacency List creation
    for(let time of times) {
        if(!graph[time[0]]) {
            graph[time[0]] = {}
        }
        graph[time[0]][time[1]] = time[2];
    }

    console.log('graph', graph)

    for(let i=1; i<=n; i++) {
        costs[i] = Infinity;
        processed[i] = false;
    }

    costs[k] = 0;

    node = k;

    console.log('costs processed', costs, processed)

    while (node !== -1) {
        let cost = costs[node];
        let neighbours = graph[node];
        for (let neighbor in neighbours) {
            let newCostOfNeighbor = cost + neighbours[neighbor];
            if (newCostOfNeighbor < costs[neighbor]) {
                costs[neighbor] = newCostOfNeighbor;
                parents[neighbor] = node;
            }
        }
        processed[node] = true;
        processedCounter++;
        node = findLowestCostNode(costs)
    }

    function findLowestCostNode(costs) {
        lowestCost = Infinity;
        lowestCostNode = -1;
        for (let node in costs) {
            cost = costs[node];
            if (cost < lowestCost && !processed[node]) {
                lowestCost = cost;
                lowestCostNode = node;
            }
        }
        return lowestCostNode;
    } 

    if (processedCounter !== n) return -1;

    let set = new Set();
    for (let node in costs) {
	    set.add(costs[node]);
    }
    let max = Math.max(...set);
    
    return max;
};

let times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
networkDelayTime(times, n, k)

// ================================================================================================== //