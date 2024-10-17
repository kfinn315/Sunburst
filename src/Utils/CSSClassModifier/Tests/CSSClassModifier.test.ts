import CSSClassModifier from "../CSSClassModifier"

describe('CSSClassModifier', () => {

    describe('addClassTo', () => {
        it('adds the class to the input element', () => {
            const className = 'testtest'
            const element = document.createElement('div', {})

            CSSClassModifier.add(element, className)

            expect(element.classList).toContain(className)
        })
    })

    describe('removeClassFrom', () => {
        it('removes the class from the input element', () => {
            const className = 'testtest'
            const element = document.createElement('div')
            element.classList.add(className)
            expect(element.classList).toContain(className)

            CSSClassModifier.remove(element, className)

            expect(element.classList).not.toContain(className)
        })
    })
})
