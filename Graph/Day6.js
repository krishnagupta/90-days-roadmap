/**
 * 133. Clone Graph
 * Time O(V + E) | Space O(N)
 */

/**
 * Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node, visited = new Map()) {
    if(node === null) return null;
    if(visited.has(node)) return visited.get(node);
    return dfs(node, visited);
};

const dfs = (node, visited) => {
    const clone = new Node(node.val);
    visited.set(node, clone);
    for(const neighbor of node.neighbors) {
        const cloneNeighbor = cloneGraph(neighbor, visited);
        clone.neighbors.push(cloneNeighbor);
    }
    return clone;
}
// ================================================================================================== //

/**
 * 695. Max Area of Island
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland(grid) {
    if(grid == null || grid.length == 0) return 0
    const r = grid.length, c = grid[0].length, queue = [], visited = new Set();
    let max = 0;
    const directions = [[1,0], [-1,0], [0,1], [0,-1]]

    const bfs = (i, j) => {
        let count = 0;
        queue.push([i,j]);
        visited.add(JSON.stringify([i,j]))

        while(queue.length !== 0) {
            const [x,y] = queue.shift();
                  count += 1;
            for(const [dx, dy] of directions) {
                if(dx+x<r && dx+x>=0 && dy+y<c && dy+y>=0 && grid[dx+x][dy+y]=="1" && !visited.has(JSON.stringify([dx+x, dy+y]))) {
                  queue.push([dx+x, dy+y])
                  visited.add(JSON.stringify([dx+x, dy+y]))
                }
            }
        }
    return count;
    }

    for(let i=0; i<r; i++) {
        for(let j=0; j<c; j++) {
            if(grid[i][j] == "1") {
              max = Math.max(max, bfs(i,j))
            }
            
        }
    }

    return max;
}

// ========================================================================================== //