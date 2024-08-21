import CssClassModifier from './CssClassModifier'

export interface ICollectionClassModifier<TElement> {
  add: (elements: TElement[]) => void
  remove: (elements: TElement[]) => void
}

export default class CollectionClassModifier implements ICollectionClassModifier<Element> {
  private readonly classModifer: CssClassModifier

  constructor(className: string) {
    this.classModifer = new CssClassModifier(className)
  }

  add(elements?: Element[]): void {
    elements?.forEach((element) => {
      this.classModifer.addClassTo(element)
    })
  }

  remove(elements?: Element[]): void {
    elements?.forEach((element) => {
      this.classModifer.removeClassFrom(element)
    })
  }
}
