import { mock } from 'jest-mock-extended'
import { TreeNode } from '../../Tree'
import { getTreeNodeHierarchy } from '../getTreeNodeHierarchy'

describe('getTreeNodeHierarchy', () => {
    it('should return the hierarchy of the root node', () => {
        // Define test data
        const root = mock<TreeNode<number>>({
            data: 1,
            children: [
                {
                    data: 2,
                    children: [
                        {
                            data: 3,
                            children: [],
                        },
                    ],
                },
                {
                    data: 4,
                    children: [],
                },
            ],
        })

        // Execute the function
        const result = getTreeNodeHierarchy(root)

        // Verify the result
        expect(result).toBeDefined()
        expect(result.data).toBe(root)
        expect(result.depth).toBe(0)
        expect(result.children).toBeDefined()
        expect(result.children).toHaveLength(root.children.length)
        expect(result.children?.[0].data).toBe(root.children[0])
        expect(result.children?.[0].depth).toBe(1)
        // Add more assertions as needed
    })

    it('should handle empty root nodes', () => {
        // Define test data
        const root = mock<TreeNode<number>>({
            data: 1,
            children: [],
        })

        // Execute the function
        const result = getTreeNodeHierarchy(root)

        // Verify the result
        expect(result).toBeDefined()
        expect(result.data).toBe(root)
        expect(result.depth).toBe(0)
        expect(result.data.children).toBeDefined()
        expect(result.data.children).toHaveLength(0)
        // Add more assertions as needed
    })

    // Add more test cases as needed to cover all scenarios
})
