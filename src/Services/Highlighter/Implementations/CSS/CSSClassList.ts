/**
 * Manipulate css classes on Elements using built-in functions
 */
export default class CSSClassList {
  static addTo(element: Element, className: string): void {
    element.classList.add(className)
  }

  static removeFrom(element: Element, className: string): void {
    element.classList.remove(className)
  }
}
