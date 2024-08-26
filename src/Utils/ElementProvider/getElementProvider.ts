import { IElementProvider, SelectorProvider } from './Types'
import { Queryer } from './Queryer'

/**
 * Creates an element provider that retrieves and returns elements based on a selector.
 * @typeparam Datum - The type of the input item.
 * @typeparam TRef - The type of the ref.
 * @typeparam TOut - The type of the returned element.
 * @param ref - The mutable ref object containing the target element.
 * @param selectorProvider - The selector provider for obtaining selectors.
 * @returns The element provider object.
 */
export function getElementProvider<
  Datum,
  TOut extends Element = Element,
>(
  queryer: Queryer,
  selectorProvider: SelectorProvider<Datum>,
): IElementProvider<Datum, TOut> {

  /**
     * Retrieves an element for the specified item.
     * @param item - The item for which to retrieve the element.
     * @returns The element corresponding to the item, or null if not found.
     */
  function get(item: Datum): TOut | null | undefined {
    if (item == undefined) {
      return null
    }
    if (selectorProvider == undefined) {
      throw new Error("selectorProvider is undefined")
    }
    const selector = selectorProvider.get(item)

    return queryer.querySelector<TOut>(selector)
  }

  /**
   * Retrieves all elements base ond the selector.
   * @returns An array of elements
   */
  function getAll(): TOut[] | undefined {
    if (selectorProvider == undefined) {
      throw new Error("selectorProvider is undefined")
    }

    return queryer.querySelectorAll<TOut>(selectorProvider.getAll())
  }

  return { get, getAll }
}
