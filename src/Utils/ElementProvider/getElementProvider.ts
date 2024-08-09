import { MutableRefObject } from 'react'

import { IElementProvider, SelectorProvider } from './Types'

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
  TRef extends ParentNode = ParentNode,
  TOut extends Element = Element,
>(
  ref: MutableRefObject<TRef | null>,
  selectorProvider: SelectorProvider<Datum>,
): IElementProvider<Datum, TOut> {

  /**
     * Retrieves an element for the specified item.
     * @param item - The item for which to retrieve the element.
     * @returns The element corresponding to the item, or null if not found.
     */
  function get(item: Datum): TOut | null {
    if (item == undefined) {
      return null
    }
    const selector = selectorProvider.get(item)

    return ref.current?.querySelector<TOut>(selector) ?? null
  }

  /**
   * Retrieves all elements base ond the selector.
   * @returns An array of elements
   */
  function getAll(): TOut[] | null {
    if (ref.current) {
      return Array.from(ref.current.querySelectorAll<TOut>(selectorProvider.getAll()))
    }
    return null
  }

  return { get, getAll }
}
