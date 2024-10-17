import { mock } from 'jest-mock-extended'
import { arcSelectorGenerator } from '../arcSelectorGenerator'
import { SunburstItemTreeNode } from '../../../Types'

describe('arcSelectorGenerator', () => {
  describe('getAll', () => {
    it('should return the correct selector to select all paths', () => {
      // Arrange
      const expectedSelector = '.arc>path'

      // Act
      const selector = arcSelectorGenerator.getAll()

      // Assert
      expect(selector).toEqual(expectedSelector)
    })
  })

  describe('get', () => {
    it('should return the correct selector to select a specific path by its id', () => {
      // Arrange
      const item = mock<SunburstItemTreeNode>({ id: 1 })
      const expectedSelector = `.arc>path[data-id="${item.id}"]`

      // Act
      const selector = arcSelectorGenerator.get(item)

      // Assert
      expect(selector).toEqual(expectedSelector)
    })
  })
})
