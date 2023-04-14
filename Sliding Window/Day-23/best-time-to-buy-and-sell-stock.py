from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        l,r = 0,1   # left=buy, right=sell
        maxP = 0

        while r < len(prices):
            # profitable ?
            if prices[l] < prices[r]:
                maxP = max(maxP, prices[r]-prices[l])
            else:
                l=r
            r += 1
        return maxP