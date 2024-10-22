/* eslint-disable */
import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import { ElementGroup, ElementListMap } from '../Types'
import BaseHighlighter from '../Implementations/BaseHighlighter'

describe('BaseHighlighter', () => {
    let elementProvider: ElementListMap<HierarchyNode<any>, Element>
    let highlight: ElementGroup<Element>

    beforeEach(() => {
        elementProvider = {
            values: jest.fn(),
            get: jest.fn(),
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
            const elements = [document.createElement('div'), document.createElement('span')];
            (elementProvider.values as jest.Mock).mockReturnValue(elements)
            const ref = { current: document.createElement('div') }
            const highlighter = new BaseHighlighter(ref, elementProvider, highlight)

            highlighter.clear()

            expect(elementProvider.values).toHaveBeenNthCalledWith(1, ref)
            expect(elementProvider.values).toHaveReturnedWith(elements)
            expect(highlight.remove).toHaveBeenNthCalledWith(1, elements)
        })
    })

    describe('highlight', () => {
        it('should call highlighter.add on elements', () => {
            //@ts-ignore
            const hierarchyNode: HierarchyRectangularNode<unknown> = {}
            const elements = [document.createElement('div'), document.createElement('span')];
            (elementProvider.get as jest.Mock).mockReturnValue(elements)
            const ref = { current: document.createElement('div') }
            const highlighter = new BaseHighlighter(ref, elementProvider, highlight)

            highlighter.add(hierarchyNode)

            expect(elementProvider.get).toHaveBeenNthCalledWith(1, ref, hierarchyNode)
            expect(elementProvider.get).toHaveReturnedWith(elements)
            expect(highlight.add).toHaveBeenNthCalledWith(1, elements)
        })
    })
})
