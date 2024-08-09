export interface IElementProvider<TDatum, TElement extends Element = Element> {
  get: (item: TDatum) => TElement | null
  getAll: () => TElement[] | null
}

export interface SelectorProvider<TDatum> {
  get: (item: TDatum) => string
  getAll: () => string
}
