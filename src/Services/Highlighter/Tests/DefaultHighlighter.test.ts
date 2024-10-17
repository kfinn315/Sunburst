/* eslint-disable */
import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import { ElementListProvider } from '../Types'
import DefaultHighlighter from '../DefaultHighlighter'
import { ElementGroup } from '../../../Utils/CSSClassModifier/Types'

describe('DefaultHighlighter', () => {
    let elementProvider: ElementListProvider<HierarchyNode<any>, Element>
    let highlight: ElementGroup<Element>

    beforeEach(() => {
        elementProvider = {
            getAll: jest.fn(),
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
            (elementProvider.getAll as jest.Mock).mockReturnValue(elements)
            const ref = { current: document.createElement('div') }
            const highlighter = new DefaultHighlighter(ref, elementProvider, highlight)

            highlighter.clear()

            expect(elementProvider.getAll).toHaveBeenNthCalledWith(1, ref)
            expect(elementProvider.getAll).toHaveReturnedWith(elements)
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
            const highlighter = new DefaultHighlighter(ref, elementProvider, highlight)

            highlighter.highlight(hierarchyNode)

            expect(elementProvider.get).toHaveBeenNthCalledWith(1, ref, hierarchyNode)
            expect(elementProvider.get).toHaveReturnedWith(elements)
            expect(highlight.add).toHaveBeenNthCalledWith(1, elements)
        })
    })
})
