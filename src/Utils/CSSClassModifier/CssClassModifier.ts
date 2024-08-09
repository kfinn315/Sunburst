/**
 * Add or remove a class to an Element
 */
export default class CssClassModifier {
  constructor(private readonly className: string) {}

  addClassTo(element: Element): void {
    element.classList.add(this.className)
  }

  removeClassFrom(element: Element): void {
    element.classList.remove(this.className)
  }
}
