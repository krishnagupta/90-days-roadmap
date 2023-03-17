/**
 * Disjoint Set Algorithm  T.C O(4alpha) = constant
 */

class DisjointSet {
    constructor(n) {
        this.rank = new Array(n);
        this.size = new Array(n);
        this.parent = new Array(n);
        this.n = n;
        this.makeSet();
    }

    makeSet() {
        for (let i = 0; i < this.n; i++) {
            this.parent[i] = i;
        }
    }

    findUltimateParent(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.findUltimateParent(this.parent[x]);
        }
        return this.parent[x];
    }

    unionByRank(x, y) {
        let xset = this.findUltimateParent(x);
        let yset = this.findUltimateParent(y);
 
        if (xset === yset) return;
 
        if (this.rank[xset] < this.rank[yset]) {
            this.parent[xset] = yset;
        } else if (this.rank[xset] > this.rank[yset]) {
            this.parent[yset] = xset;
        } else {
            // yset attach to xset ans xset size increases
            this.parent[yset] = xset;
            this.rank[xset] = this.rank[xset] + 1;
        }
    }

    unionBySize(x, y) {
        let xset = this.findUltimateParent(x);
        let yset = this.findUltimateParent(y);
 
        if (xset === yset) return;
 
        if (this.size[xset] < this.size[yset]) {
            this.parent[xset] = yset;
            this.size[yset] += this.size[xset]
        } else {
            // yset attach to xset ans xset size increases
            this.parent[yset] = xset;
            this.size[xset] += this.size[yset]
        }
    }
}

// Example
let obj = new DisjointSet(5);
obj.unionBySize(0, 2);
obj.unionBySize(4, 2);
obj.unionBySize(3, 1);

console.log(obj.findUltimateParent(4) === obj.findUltimateParent(0)) // true
console.log(obj.findUltimateParent(1) === obj.findUltimateParent(0)) // false

// =============================================================================================== //

/**
 * 721. Accounts Merge [Medium]
 */

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    let result = []
    const accountLength = accounts.length;
    const mapMailNode = new Map();
    let obj = new DisjointSet(accountLength);

    for(let i=0; i<accountLength; i++){
        for(let j=1; j<accounts[i].length; j++){
            let email = accounts[i][j];

            if(!mapMailNode.has(email)) {
                mapMailNode.set(email, i)
            } else {
                obj.unionBySize(i, mapMailNode.get(email))
            }
        }
    }

    // merging mail according to disjoint set
    const mapMergedMail = new Map()
    for(let [key, value] of mapMailNode) {
        let node = obj.findUltimateParent(value)
        mapMergedMail.set(node || value, key)
    }

    for(let i=0; i<accountLength; i++) {
        if(mapMergedMail.get(i).length == 0) continue;
        const temp = [];
        temp.push(accounts[i][0])
        temp.push(mapMergedMail.get(i))
        result.push(temp)
    }

    return result;
};

// ==================================================================================================== //