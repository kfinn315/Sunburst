import { addToNodeRecursively } from "../addToNodeRecursively"
import { KNode } from "../KNode"

describe('addToNodeRecursively', () => {
    let idGenerator: { next(): number }
    let rootNode: KNode<unknown>

    beforeEach(() => {
        idGenerator = { next: jest.fn(() => 1) }
        rootNode = new KNode<unknown>(0, 'root')
    })

    it('should set the data property of the node if there are no more segments', () => {
        // Arrange
        const nameIterator: IterableIterator<string> = {
            next: jest.fn(() => ({ done: true, value: "" } as IteratorResult<string>)), [Symbol.iterator]: () => { return nameIterator }
        }
        const data = { name: 'item1' }

        // Act
        addToNodeRecursively({ idGenerator, nameIterator, node: rootNode, data })

        // Assert
        expect(rootNode.data).toBe(data)
    })

    it('should create a child node and add it to the parent node if it does not exist', () => {
        const nextFn = jest.fn(() => ({ done: false, value: 'segment1' })).mockReturnValueOnce(({ done: false, value: 'segment1' })).mockReturnValueOnce(({ done: true, value: 'segment2' }))
        // Arrange
        const nameIterator = {
            next: nextFn, [Symbol.iterator]: () => { return nameIterator }
        }
        const data = { name: 'item1' }

        // Act
        addToNodeRecursively({ idGenerator, nameIterator, node: rootNode, data })

        // Assert
        expect(rootNode.children.length).toBe(1)
        expect(rootNode.children[0].id).toBe(1)
        // expect(rootNode.children[0].name).toBe('segment1
    })
})