import CSSClassGroup from "../CSSClassGroup"

describe('CSSClassGroup', () => {

  describe('add', () => {
    it('adds the class to the elements', () => {
      //setup
      const elements = [document.createElement('div')]
      const className = 'randomString00000'
      const classGroup = new CSSClassGroup(className)

      //execute
      classGroup.add(elements)

      //test
      elements.forEach(element => expect(element.classList.contains(className)))

    })
  })

  describe('remove', () => {
    it('removes the class from the element', () => {
      //setup
      const elements = [document.createElement('div')]
      const className = 'randomString00000'
      elements.forEach(e => e.classList.add(className))
      const classGroup = new CSSClassGroup(className)

      //execute
      classGroup.remove(elements)

      //test
      elements.forEach(element => expect(element.classList.contains(className)).toBe(false))

    })
  })
})