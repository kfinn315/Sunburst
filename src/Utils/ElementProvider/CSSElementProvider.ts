import { MutableRefObject } from 'react'
import { SelectorGenerator, ElementProvider, QueryService } from './Types'

/**
 *
 * Get element representation of items by connecting the selectorGenerator and queryService 
 * @export
 * @class ElementProvider
 * @implements {ElementProvider}
 * @template TIn
 * @template TElement
 */
export default class CSSElementProvider<TIn, TElement extends Element = Element,> implements ElementProvider<TIn> {

  constructor(
    private readonly queryService: QueryService<string>,
    private readonly selectorGenerator: SelectorGenerator<TIn>,) { }

  /**
     * Retrieve an element for the input item.
     * @param item - The item for which to retrieve the element.
     * @returns The element corresponding to the item, or null if not found.
     */
  get(ref: MutableRefObject<Element>, item: TIn): TElement | null | undefined {
    if (item == undefined) {
      return null
    }
    if (this.selectorGenerator == undefined) {
      throw new Error("selectors is undefined")
    }
    const selector = this.selectorGenerator.get(item)

    return this.queryService.query<TElement>(ref, selector)
  }

  /**
   * Retrieves all elements.
   * @returns An array of elements
   */
  getAll(ref: MutableRefObject<Element>): TElement[] | undefined {
    if (this.selectorGenerator == undefined) {
      throw new Error("selectors is undefined")
    }

    return this.queryService.queryAll<TElement>(ref, this.selectorGenerator.getAll())
  }

}
