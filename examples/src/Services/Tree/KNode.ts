import { TreeNode } from './Types'

export class KNode<TData> implements TreeNode<TData> {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly children: KNode<TData>[] = [],
    public data?: TData,
  ) { }

  findChild(name: string): KNode<TData> | undefined {
    return this.children.find((child) => child.name === name)
  }

  addChild(childNode: KNode<TData>) {
    this.children.push(childNode)
  }
}
