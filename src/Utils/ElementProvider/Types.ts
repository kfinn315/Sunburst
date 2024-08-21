export interface IElementProvider<TDatum, TElement extends Element = Element> {
  get: (item: TDatum) => TElement | null | undefined
  getAll: () => TElement[] | undefined
}

export interface SelectorProvider<TDatum> {
  get: (item: TDatum) => string
  getAll: () => string
}
