
/**
 * 690. Employee Importance [Easy]
 */

/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */

// S.C & T.C = O(N)

var GetImportance = function(employees, id) {
  const map = new Map()
  for(employee of employees) {
      map.set(employee.id, employee)
  }

  const dfs = (id) => {
      const e = map.get(id)
      let ans = e.importance
      for(subid of e.subordinates){
         ans += dfs(subid)
      }
      return ans
  }

  return dfs(id)
};


// ================================================================================================ //

/**
 * 997. Find the Town Judge [Easy]
 */

/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */

 // S.C = O(E), T.C = O(N)

 var findJudge = function(n, trust) {
    
  if(trust.length < n-1) return -1

  const trustScores = new Array(n+1).fill(0)

  for(relation of trust) {
      trustScores[relation[0]]--
      trustScores[relation[1]]++
  }

  for(let i=1; i<=n; i++) {
      if(trustScores[i] == n-1) {
          return i;
      }
  }

  return -1
};



// ================================================================================================= //


/**
 * 399. Evaluate Division [Medium]
 */

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */

/**
 * Approach 1: Path Search in Graph
 */
var calcEquation = function (equations, values, queries) {
  const graph = buildGraph(equations, values);
  const resp = new Array(queries.length);

  queries.forEach((query, i) => {
    const [u, v] = query;

    resp[i] = dfs(graph, u, v);
  });
  return resp;
};

const dfs = (graph, u, v) => {
  if (!graph.has(u) || !graph.has(v)) return -1;

  const stack = [{vertex: u, accum: 1}], visited = new Set();
  visited.add(u);

  let result = -1;
  while (stack.length) {
    const curr = stack.pop();
    if (curr.vertex === v) {
      result = curr.accum;
      break;
    }

    const adj = graph.get(curr.vertex);
    adj.forEach((edge) => {
      const dest = edge.v,
        w = edge.w;

      if (!visited.has(dest)) {
        visited.add(dest);
        stack.push({vertex: dest, accum: curr.accum * w});
      }
    });
  }
  return result;
};

const buildGraph = (equations, values) => {
  const graph = new Map();

  equations.forEach((equation, i) => {
    const [u, v] = equation;
    const value = values[i];

    if (!graph.has(u)) graph.set(u, new Array());
    graph.get(u).push({v: v, w: value});

    if (!graph.has(v)) graph.set(v, new Array());
    graph.get(v).push({v: u, w: 1 / value});
  });

  return graph;
};


// ================================================================================================ //
