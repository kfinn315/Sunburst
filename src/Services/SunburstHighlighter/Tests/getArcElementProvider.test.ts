import { getArcElementProvider } from "../getArcElementProvider"
import { getElementProvider } from "../../../Utils/ElementProvider/getElementProvider"
import { arcSelectorProvider } from "../arcSelectorProvider"
import { mock } from "jest-mock-extended"
import { IElementProvider } from "../../../Utils/ElementProvider"

jest.mock("../../../Utils/ElementProvider/getElementProvider", () => ({ getElementProvider: jest.fn() }))

describe('getArcElementProvider', () => {
    let ref: React.MutableRefObject<SVGGElement | null>
    let mockGetElementProvider: jest.Mock

    beforeEach(() => {
        ref = {
            current: document.createElementNS("http://www.w3.org/2000/svg", "g"),
        }
        mockGetElementProvider = getElementProvider as jest.Mock
    })

    describe('when called', () => {
        it('should return the value of getElementProvider', () => {
            //Arrange
            const mockElementProvider = mock<IElementProvider<unknown>>()
            mockGetElementProvider.mockReturnValue(mockElementProvider)

            //Act
            const arcElementProvider = getArcElementProvider(ref)

            //Assert
            expect(arcElementProvider).toBe(mockElementProvider)
            // assert other expectations about the arc element provider if needed
        })
        it('passes ref and arcSelectorProvider to getElementProvider', () => {
            getArcElementProvider(ref)

            expect(mockGetElementProvider).toHaveBeenCalledWith(ref, arcSelectorProvider)
        })
    })
    //TODO
})
