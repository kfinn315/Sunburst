import CssClassModifier from './CssClassModifier'

export interface ICollectionClassModifier {
  remove: (elements: Element[]) => void
  add: (elements: Element[]) => void
}

export default class CollectionClassModifier
  implements ICollectionClassModifier
{
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
