export type HasChildren<TData> = TData & {
  children?: TData[]
}
