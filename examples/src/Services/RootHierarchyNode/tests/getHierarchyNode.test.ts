import { HierarchyNode } from 'd3-hierarchy'
import { mock } from 'jest-mock-extended'

import { SunburstItemTreeNode } from "kfinn315_sunburst";
import { getHierarchyNode } from '../getHierarchyNode'

describe('getHierarchyNode', () => {
    it('should call getTreeNodeHierarchy, sum, and sort with the correct arguments', () => {
        // Arrange
        const root = mock<SunburstItemTreeNode>({
            children: []
        })

        const mockSort = jest.fn()
        const mockSum = jest.fn()

        //@ts-expect-error
        const mockHierarchyNode = mock<HierarchyNode<SunburstItemTreeNode>>({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            sort: (compare) => { mockSort(compare); return mockHierarchyNode },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            sum: (value) => { mockSum(value); return mockHierarchyNode }
        })

        const mockGetTreeNodeHierarchy = jest.fn().mockReturnValue(mockHierarchyNode)
        const mockGetValue = jest.fn();
        const mockCompare = jest.fn();

        // Act
        getHierarchyNode({ root, getTreeNodeHierarchy: mockGetTreeNodeHierarchy, getValue: mockGetValue, compare: mockCompare })

        // Assert
        expect(mockGetTreeNodeHierarchy).toHaveBeenCalledWith(root)
        expect(mockSum).toHaveBeenCalledWith(mockGetValue)
        expect(mockSort).toHaveBeenCalledWith(mockCompare)
    })
})
