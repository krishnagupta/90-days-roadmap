/**
 * 802. Find Eventual Safe States
 */

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
    const n = graph.length, result = [];
    const map_node_isSafe = new Map();

    const dfs = (i) => {
        if(map_node_isSafe.has(i)) return map_node_isSafe.get(i);
        map_node_isSafe.set(i, false);
        for(let neighbor of graph[i]) {
            if(!dfs(neighbor)){
                return false;
            }
        }
        map_node_isSafe.set(i, true);
        return true;
    }

    for(let i=0; i<n; i++) {
        if(dfs(i)) result.push(i)
    }
    return result;
};

console.log(eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]]))

// ================================================================================================== //