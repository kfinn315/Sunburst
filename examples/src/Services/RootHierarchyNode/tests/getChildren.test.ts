import { mock } from 'jest-mock-extended';
import { TreeNode } from '../../Tree/Types';
import { getChildren } from '../getChildren';

describe('getChildren', () => {
    it('should return the children of a given TreeNode', () => {
        // Arrange
        const child1 = mock<TreeNode<number>>({ id: 1, data: 2 })
        const child2 = mock<TreeNode<number>>({ id: 2, data: 3 })
        const treeNode: TreeNode<number> = { id: 0, children: [child1, child2] }

        // Act
        const result = getChildren(treeNode);

        // Assert
        expect(result.length).toBe(2);
        expect(result).toContain(child1)
        expect(result).toContain(child2)
    });
});
