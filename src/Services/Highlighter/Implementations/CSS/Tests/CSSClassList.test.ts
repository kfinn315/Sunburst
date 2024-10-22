import CSSClassList from "../CSSClassList"

describe('CSSClassList', () => {

    describe('addTo', () => {
        it('adds the class to the input element', () => {
            const className = 'testtest'
            const element = document.createElement('div', {})

            CSSClassList.addTo(element, className)

            expect(element.classList).toContain(className)
        })
    })

    describe('removeFrom', () => {
        it('removes the class from the input element', () => {
            const className = 'testtest'
            const element = document.createElement('div')
            element.classList.add(className)
            expect(element.classList).toContain(className)

            CSSClassList.removeFrom(element, className)

            expect(element.classList).not.toContain(className)
        })
    })
})
