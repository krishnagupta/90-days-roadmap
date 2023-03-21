/**
 * 200. Number of Islands
 */

/**
 * @param {character[][]} grid
 * @return {number}
 * TC O(M*N)
 */
var numIslands = function(grid) {
    if (grid === null || grid.length === 0) { return 0 }
    const rows = grid.length, cols = grid[0].length, queue=[];
    const visited = new Set();
    let islands = 0;

    const directions = [[1,0], [-1,0], [0,1], [0,-1]]

    const bfs = (r, c) => {
        visited.add(JSON.stringify([r,c]))
        queue.push([r,c])

        while(queue.length!==0) {
            let [x,y] = queue.shift()
            for(const [dx, dy] of directions) {
                if(dx+x<rows && dx+x>=0 && dy+y<cols && dy+y>=0 && grid[dx+x][dy+y]=="1" && !visited.has(JSON.stringify([dx+x, dy+y]))) {
                  queue.push([dx+x, dy+y])
                  visited.add(JSON.stringify([dx+x, dy+y]))
                }
            }
        }
    }

    for( let r=0; r<rows; r++) {
        for(let c=0; c<cols; c++) {
            if(grid[r][c] == "1" && !visited.has(JSON.stringify([r, c]))) {
                bfs(r, c)
                islands += 1;
            }
        }
    }
return islands;
};

// ============================================================================================ //