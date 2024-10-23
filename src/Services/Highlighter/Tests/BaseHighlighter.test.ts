/* eslint-disable */
import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import { ElementGroup, ElementListMap } from '../Types'
import BaseHighlighter from '../Implementations/BaseHighlighter'

describe('BaseHighlighter', () => {
    let elementProvider: ElementListMap<HierarchyNode<any>, Element>
    let highlight: ElementGroup<Element>
    const mockValuesFn = jest.fn()
    const mockGetFn = jest.fn()

    beforeEach(() => {
        elementProvider = {
            values: mockValuesFn,
            get: mockGetFn,
        }
        highlight = {
            add: jest.fn(),
            remove: jest.fn()
        }
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('clear', () => {
        it('should call highlighter.remove on elements', () => {
            //Arrange
            const highlighter = new BaseHighlighter(elementProvider, highlight)
            const elements = [document.createElement('div'), document.createElement('span')];
            mockValuesFn.mockReturnValue(elements)

            //Act
            highlighter.clear()

            //Assert
            expect(elementProvider.values).toHaveBeenNthCalledWith(1)
            expect(elementProvider.values).toHaveReturnedWith(elements)
            expect(highlight.remove).toHaveBeenNthCalledWith(1, elements)
        })
    })

    describe('highlight', () => {
        it('should call highlighter.add on elements', () => {
            //Arrange
            //@ts-ignore
            const highlighter = new BaseHighlighter(elementProvider, highlight)
            const elements = [document.createElement('div'), document.createElement('span')];
            mockGetFn.mockReturnValue(elements)
            const hierarchyNode: HierarchyRectangularNode<unknown> = {}

            //Act
            highlighter.add(hierarchyNode)

            //Assert
            expect(elementProvider.get).toHaveBeenNthCalledWith(1, hierarchyNode)
            expect(elementProvider.get).toHaveReturnedWith(elements)
            expect(highlight.add).toHaveBeenNthCalledWith(1, elements)
        })
    })
})
