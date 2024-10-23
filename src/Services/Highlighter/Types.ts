import { MutableRefElement } from "../../Types";

/**
 * Highlight item or clear all highlights
 */
export interface Highlighter<TIn> {
  clear: () => void
  add: (item: TIn) => void
}

/**
 * Generate a selector string for an individual or all items
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

/**
 * Maps items to DOM elements
 */
export interface ElementMap<TIn, TElement extends Element = Element> {
  get(ref: MutableRefElement, item: TIn): TElement | null | undefined
  values(ref: MutableRefElement,): TElement[] | undefined
}

/**
 * Maps items to a list of DOM elements. Values method returns a flattened list of DOM elements.
 */
export interface ElementListMap<TIn, TElement extends Element = Element,
> {
  get: (item: TIn) => TElement[]
  values: () => TElement[]
}

/**
 * Add and remove elements from a group
 */
export interface ElementGroup<TElement> {
  add: (elements: TElement[]) => void;
  remove: (elements: TElement[]) => void;
}


export interface HighlighterFactory<TNodeData> {
  get(ref: MutableRefElement): Highlighter<TNodeData>;
}
