# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # find length of list
        count = 0
        curr = head
        while curr:
            curr = curr.next
            count += 1 
        
        # If first node to delete
        if count == n:
            return head.next

        # find node to remove
        currNode = head
        nodeBeforeRemoveIndex = count-n-1
        for i in range(nodeBeforeRemoveIndex):
            currNode = currNode.next
        currNode.next = currNode.next.next

        return head