import { GetSegmentIterator } from "./GetSegmentIterator";

export interface TreeNode<TData> {
  id: number
  name?: string
  data?: TData
  children: TreeNode<TData>[]
}

export type CreateTree<T> = (items: readonly T[], getSegmentIterator: GetSegmentIterator<T>) => TreeNode<T>;
