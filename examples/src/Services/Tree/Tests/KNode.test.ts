import { KNode } from "../KNode"

describe('KNode', () => {
    describe('findChild', () => {
        it('should return the child node with the specified name', () => {
            // Arrange
            const root = new KNode(1, 'Root')
            const child1 = new KNode(2, 'Child1')
            const child2 = new KNode(3, 'Child2')
            root.addChild(child1)
            root.addChild(child2)

            // Act
            const result = root.findChild('Child1')

            // Assert
            expect(result).toBe(child1)
        })

        it('should return undefined if no child node with the specified name is found', () => {
            // Arrange
            const root = new KNode(1, 'Root')
            const child1 = new KNode(2, 'Child1')
            root.addChild(child1)

            // Act
            const result = root.findChild('Child2')

            // Assert
            expect(result).toBeUndefined()
        })
    })

    describe('addChild', () => {
        it('should add a child node to the parent node', () => {
            // Arrange
            const root = new KNode(1, 'Root')
            const child1 = new KNode(2, 'Child1')

            // Act
            root.addChild(child1)

            // Assert
            expect(root.children).toContain(child1)
        })
    })
})
