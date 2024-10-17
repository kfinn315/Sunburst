import { HierarchyNode } from "d3";
import { QueryService } from "../../Utils/ElementProvider";
import { MutableRefElement } from "../../Types/MutableRefElement";

/**
 * Highlighter methods
 */
export interface Highlighter<TIn> {
  clear: () => void
  highlight: (item: TIn) => void
}

/**
 * Provides Element lists for a specific item and all Elements
 */
export interface ElementListProvider<TIn, TOut extends Element = Element,
> {
  get: (ref: MutableRefElement, item: TIn) => TOut[]
  getAll: (ref: MutableRefElement) => TOut[]
}

export type GetHighlighter<TIn, TOut> = (queryer: QueryService<TIn>) => Highlighter<HierarchyNode<TOut>>
