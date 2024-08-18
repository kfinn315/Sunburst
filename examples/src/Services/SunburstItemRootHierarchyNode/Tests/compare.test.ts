import { mock } from "jest-mock-extended"
import { SunburstItem } from "kfinn315_sunburst";
import { TreeNode } from "../../Tree"
import { compare } from "../compare"

describe('compare', () => {
    it('should return a positive number if the value of nodeB is larger', () => {
        // Arrange
        const nodeA = mock<TreeNode<SunburstItem>>({
            data: mock<SunburstItem>({ size: 50 })
        })

        const nodeB = mock<TreeNode<SunburstItem>>({
            data: mock<SunburstItem>({ size: 100 })
        })

        // Act
        const result = compare({ data: nodeA }, { data: nodeB })

        // Assert
        expect(result).toBeGreaterThan(0)
    })

    it('should return a negative number if the value of nodeA is larger', () => {
        // Arrange
        const nodeA = mock<TreeNode<SunburstItem>>({
            data: mock<SunburstItem>({ size: 100 })
        })

        const nodeB = mock<TreeNode<SunburstItem>>({
            data: mock<SunburstItem>({ size: 50 })
        })

        // Act
        const result = compare({ data: nodeA }, { data: nodeB })

        // Assert
        expect(result).toBeLessThan(0)
    })

    it('should return zero if the value of nodeA is equal to value of nodeB', () => {
        // Arrange
        const nodeA = mock<TreeNode<SunburstItem>>({
            data: mock<SunburstItem>({ size: 100 })
        })

        const nodeB = mock<TreeNode<SunburstItem>>({
            data: mock<SunburstItem>({ size: 100 })
        })

        // Act
        const result = compare({ data: nodeA }, { data: nodeB })

        // Assert
        expect(result).toBe(0)
    })
})