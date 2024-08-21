import { HierarchyNode } from "d3";
import { Queryer } from '../../Utils/ElementProvider';

/**
 * Highlighter methods
 */
export interface Highlighter<T> {
  clear: () => void
  highlight: (item: T) => void
}

/**
 * Provides Element lists for a specific item and all Elements
 */
export interface ElementListProvider<
  TInput,
  TElement extends Element = Element,
> {
  get: (item: TInput) => TElement[]
  getAll: () => TElement[]
}


export type GetHighlighter<TData> = (
  queryer: Queryer
) => Highlighter<HierarchyNode<TData>>
