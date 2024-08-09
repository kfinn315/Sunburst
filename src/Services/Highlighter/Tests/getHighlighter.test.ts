/* eslint-disable */
import { HierarchyNode } from 'd3'
import { ElementListProvider, Highlighter, } from '../Types'
import getHighlighter from '../getHighlighter'

describe('getHighlighter', () => {
    let elementProvider: ElementListProvider<HierarchyNode<any>, Element>
    let highlighter: Highlighter<HierarchyNode<any>>

    beforeEach(() => {
        elementProvider = {
            getAll: jest.fn(),
            get: jest.fn(),
        }
        highlighter = getHighlighter(elementProvider)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('clear', () => {
        it('should remove the "highlight" class from all elements', () => {
            const elements = [document.createElement('div'), document.createElement('span')];
            (elementProvider.getAll as jest.Mock).mockReturnValue(elements)

            highlighter.clear()

            expect(elementProvider.getAll).toHaveBeenCalledTimes(1)
            expect(elementProvider.getAll).toHaveBeenCalledWith()
            expect(elements[0].classList.contains('highlight')).toBe(false)
            expect(elements[1].classList.contains('highlight')).toBe(false)
        })
    })

    describe('highlight', () => {
        it('should add the "highlight" class to the specified hierarchyNode elements', () => {
            const hierarchyNode = {} as HierarchyNode<any>
            const elements = [document.createElement('div'), document.createElement('span')];
            (elementProvider.get as jest.Mock).mockReturnValue(elements)

            highlighter.highlight(hierarchyNode)

            expect(elementProvider.get).toHaveBeenCalledTimes(1)
            expect(elementProvider.get).toHaveBeenCalledWith(hierarchyNode)
            expect(elements[0].classList.contains('highlight')).toBe(true)
            expect(elements[1].classList.contains('highlight')).toBe(true)
        })
    })
})
