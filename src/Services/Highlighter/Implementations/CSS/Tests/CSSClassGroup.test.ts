import CSSClassGroup from "../CSSClassGroup"

describe('CSSClassGroup', () => {

  describe('add', () => {
    it('adds the class to the elements', () => {
      //Arrange
      const elements = [document.createElement('div')]
      const className = 'randomString00000'
      const classGroup = new CSSClassGroup(className)

      //Act
      classGroup.add(elements)

      //Assert
      elements.forEach(element => expect(element.classList.contains(className)))

    })
  })

  describe('remove', () => {
    it('removes the class from the element', () => {
      //Arrange
      const elements = [document.createElement('div')]
      const className = 'randomString00000'
      elements.forEach(e => e.classList.add(className))
      const classGroup = new CSSClassGroup(className)

      //Act
      classGroup.remove(elements)

      //Assert
      elements.forEach(element => expect(element.classList.contains(className)).toBe(false))

    })
  })
})