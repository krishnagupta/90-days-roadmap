class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        res, l = 0, 0
        charSet = set()

        for r in range(len(s)):
            while s[r] in charSet:
                l += 1
                charSet.remove(s[l])
            charSet.add(s[r])
            res = max(res, r-l)
        
        return res