import getLastArrayItem from "../getLastArrayItem"


describe('getLastArrayItem', () => {
    it('should return the last item of the array', () => {
        // Arrange
        const array = [1, 2, 3, 4, 5]

        // Act
        const result = getLastArrayItem(array)

        // Assert
        expect(result).toBe(5)
    })

    it('should return the last item of the array of strings', () => {
        // Arrange
        const array = ['apple', 'banana', 'orange']

        // Act
        const result = getLastArrayItem(array)

        // Assert
        expect(result).toBe('orange')
    })

    it('should return undefined if the array is empty', () => {
        // Arrange
        const array: number[] = []

        // Act
        const result = getLastArrayItem(array)

        // Assert
        expect(result).toBeUndefined()
    })
})
