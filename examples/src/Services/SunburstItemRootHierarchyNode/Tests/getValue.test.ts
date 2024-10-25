import { mock } from "jest-mock-extended"
import { TreeNode } from "../../Tree"
import { getValue } from '../getValue'
import { SunburstItem } from "../../../sunburstLibrary"


describe('getValue', () => {
  it('should return the size of the data property if it exists', () => {
    // Arrange
    const node = mock<TreeNode<SunburstItem>>({
      data: mock<SunburstItem>({ size: 100 }),
    })

    // Act
    const result = getValue(node)

    // Assert
    expect(result).toBe(100)
  })

  it('should return 0 if the data property does not exist', () => {
    // Arrange
    const node: TreeNode<SunburstItem> = mock<TreeNode<SunburstItem>>({
      data: undefined
    })

    // Act
    const result = getValue(node)

    // Assert
    expect(result).toBe(0)
  })
})
