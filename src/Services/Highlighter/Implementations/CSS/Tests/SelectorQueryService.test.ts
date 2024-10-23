import { mock } from "jest-mock-extended"

import SelectorQueryService from "../SelectorQueryService"
import { MutableRefElement } from "../../../../../Types"

describe('SelectorQueryService', () => {

    beforeEach(() => {

    })
    describe('query', () => {
        it('calls ref.current.querySelector', () => {
            const queryString = ""
            const mockQuerySelector = jest.fn()
            const mutableRefElementMock = mock<MutableRefElement>({ current: mock<Element>({ querySelector: mockQuerySelector }) })
            const service = new SelectorQueryService(mutableRefElementMock)

            service.query(queryString)

            expect(mockQuerySelector).toHaveBeenCalledWith(queryString)
        })
    })

    describe('queryAll', () => {
        it('calls ref.current.querySelectorAll', () => {
            const queryString = ""
            const returnedElementList = [].entries()
            const mockQuerySelectorAll = jest.fn().mockReturnValue(returnedElementList)
            const mutableRefElementMock = mock<MutableRefElement>({ current: mock<Element>({ querySelectorAll: mockQuerySelectorAll }) })
            const service = new SelectorQueryService(mutableRefElementMock)

            service.queryAll(queryString)

            expect(mockQuerySelectorAll).toHaveBeenCalledWith(queryString)
        })
    })
})