import { KNode } from '../KNode'
import { addToNodeRecursively } from '../addToNodeRecursively'

jest.mock("../addToNodeRecursively")
import createTree from '../createTree'

type T = { name: string, segments: string[] }

describe('createTree', () => {
    let rootNode: KNode<unknown>
    let items: T[]
    let getSegmentIterator = jest.fn()

    beforeEach(() => {
        rootNode = new KNode<T>(0, 'root')
        items = [
            { name: 'item1', segments: ['segment1', 'segment2'] },
            { name: 'item2', segments: ['segment1', 'segment3'] },
        ]
        getSegmentIterator = jest.fn((item: T) => item.segments[Symbol.iterator]())

        createTree(items, getSegmentIterator)
    })

    it('should create a root node', () => {
        expect(rootNode.id).toBe(0)
        expect(rootNode.name).toBe('root')
    })

    it('should call addToNodeRecursively for each item', () => {
        expect(addToNodeRecursively).toHaveBeenCalledTimes(2)
    })

    //TODO Finish this test
    //   it('should pass correct arguments to addToNodeRecursively', () => {
    //     expect(addToNodeRecursively).toHaveBeenCalledWith({
    //       idGenerator: expect.anything(),
    //       nameIterator: items[0].segments[Symbol.iterator](),
    //       data: items[0],
    //       node: rootNode,
    //     })

    //     expect(addToNodeRecursively).toHaveBeenCalledWith()
})
