/**
 * Add or remove a class to an Element
 */
export default class CSSClassModifier {
  static add(element: Element, className: string): void {
    element.classList.add(className)
  }

  static remove(element: Element, className: string): void {
    element.classList.remove(className)
  }
}
