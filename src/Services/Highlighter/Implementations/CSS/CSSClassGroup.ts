import { ElementGroup } from '../../Types'
import CSSClassList from './CSSClassList'

/**
 * Add or remove elements of a CSS class group
 */
export default class CSSClassGroup<TElement extends Element> implements ElementGroup<TElement> {

  constructor(private readonly className: string) { }

  add(elements?: TElement[]): void {
    elements?.forEach((element) => {
      CSSClassList.addTo(element, this.className)
    })
  }

  remove(elements?: TElement[]): void {
    elements?.forEach((element) => {
      CSSClassList.removeFrom(element, this.className)
    })
  }
}
