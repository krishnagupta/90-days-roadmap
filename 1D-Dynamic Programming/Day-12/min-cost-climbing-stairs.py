from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        for i in range(len(cost) - 3, -1, -1): # (, beginning of array, decr each time by)
            cost[i] += min(cost[i + 1], cost[i + 2])

        return min(cost[0], cost[1])