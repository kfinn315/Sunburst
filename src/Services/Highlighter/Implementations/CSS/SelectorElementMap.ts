import { SelectorGenerator, ElementMap, QueryService } from '../../Types'

/**
 *
 * Provides a map of items to DOM elements using CSS selectors
 * @export
 * @class ElementProvider
 * @implements {ElementMap}
 * @template TIn
 * @template TElement
 */
export default class SelectorElementMap<TIn, TElement extends Element = Element,> implements ElementMap<TIn> {

  constructor(
    private readonly queryService: QueryService<string>,
    private readonly selectorGenerator: SelectorGenerator<TIn>,) { }

  /**
     * Retrieve an element for the input item.
     * @param item - The item for which to retrieve the element.
     * @returns The element corresponding to the item, or null if not found.
     */
  get(item: TIn): TElement | null | undefined {
    if (item == undefined) {
      return null
    }
    if (this.selectorGenerator == undefined) {
      throw new Error("selectorGenerator is undefined")
    }
    const selector = this.selectorGenerator.get(item)

    return this.queryService.query<TElement>(selector)
  }

  /**
   * Retrieves all elements.
   * @returns An array of elements
   */
  values(): TElement[] | undefined {
    if (this.selectorGenerator == undefined) {
      throw new Error("selectorGenerator is undefined")
    }
    const selector = this.selectorGenerator.getAll()
    return this.queryService.queryAll<TElement>(selector)
  }

}
