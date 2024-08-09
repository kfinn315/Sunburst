import ArcGroup from "../ArcGroup"
import { getArc } from "../getArc"
import { getPaddedArc } from "../getPaddedArc"

jest.mock('../getArc', () => ({ getArc: jest.fn() }))
jest.mock('../getPaddedArc', () => ({ getPaddedArc: jest.fn() }))

const ZeroArcMock = jest.requireMock<{ zeroArc: unknown }>('../zeroArc');
jest.mock('../zeroArc', () => ({
  zeroArc: undefined
}));

describe('ArcGroup', () => {
  let mockGetArc: jest.Mock;
  let mockGetPaddedArc: jest.Mock;

  beforeEach(() => {
    mockGetArc = (getArc as jest.Mock)
    mockGetPaddedArc = (getPaddedArc as jest.Mock)
    jest.clearAllMocks()
  })

  it('should create an instance of ArcGroup with the correct properties', () => {
    // Arrange
    const mockRadius = 50

    const mockGetArcValue = { name: 'getArc' };
    mockGetArc.mockReturnValue(mockGetArcValue)

    const mockGetPaddedArcValue = { name: 'paddedArc' };
    mockGetPaddedArc.mockReturnValue(mockGetPaddedArcValue)

    const mockZeroArc = { name: 'zeroArc' }
    ZeroArcMock.zeroArc = mockZeroArc

    // Act
    const arcGroup = new ArcGroup(mockRadius)

    // (zeroArc)
    // Assert
    expect(arcGroup).toBeInstanceOf(ArcGroup)
    expect(arcGroup.basic).toBe(mockGetArcValue)
    expect(arcGroup.padded).toBe(mockGetPaddedArcValue)
    expect(arcGroup.zero).toEqual(mockZeroArc)
  })

  it('should call the getPaddedArc and getArc functions when creating the instance', () => {
    // Arrange
    const mockRadius = 50

    // Act
    new ArcGroup(mockRadius)

    // Assert
    expect(mockGetArc).toBeCalledWith(mockRadius)
    expect(mockGetPaddedArc).toBeCalledWith(mockRadius)
  })
})
