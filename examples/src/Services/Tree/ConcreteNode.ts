import { TreeNode } from './Types'

export class ConcreteNode<TData> implements TreeNode<TData> {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly children: ConcreteNode<TData>[] = [],
    public data?: TData,
  ) { }

  findChild(name: string): ConcreteNode<TData> | undefined {
    return this.children.find((child) => child.name === name)
  }

  addChild(childNode: ConcreteNode<TData>) {
    this.children.push(childNode)
  }
}
