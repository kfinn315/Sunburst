import { MutableRefElement } from '../../Types/MutableRefElement';
export interface ElementProvider<TIn, TOut extends Element = Element> {
  get(ref: MutableRefElement, item: TIn): TOut | null | undefined
  getAll(ref: MutableRefElement,): TOut[] | undefined
}

/**
 * Generate a selector string for an individual item or for all items
 */
export interface SelectorGenerator<T> {
  get: (item: T) => string
  getAll: () => string
}

/**
 * Query using a selector into a single item or a list of items
 */
export interface QueryService<TIn> {
  query<T extends Element = Element>(ref: MutableRefElement, selectors: TIn): T | null | undefined;
  queryAll<T extends Element = Element>(ref: MutableRefElement, selectors: TIn): Array<T> | undefined;
}
