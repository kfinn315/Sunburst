import CSSClassModifier from './CSSClassModifier'
import { ElementGroup } from './Types'

/**
 * Add or remove elements of a CSS class group
 */
export default class CSSClassGroup<TElement extends Element> implements ElementGroup<TElement> {

  constructor(private readonly className: string) {
  }

  add(elements?: TElement[]): void {
    elements?.forEach((element) => {
      CSSClassModifier.add(element, this.className)
    })
  }

  remove(elements?: TElement[]): void {
    elements?.forEach((element) => {
      CSSClassModifier.remove(element, this.className)
    })
  }
}
