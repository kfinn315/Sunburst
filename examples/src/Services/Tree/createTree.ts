import { addToNodeRecursively } from './addToNodeRecursively'
import { ConcreteNode } from './ConcreteNode'
import { BasicIDGenerator } from '../../../../src/Utils/IDGenerator'
import { TreeNode, GetSegmentIterator } from './Types'

interface Props<TData> {
  items: readonly TData[];
  getSegmentIterator: GetSegmentIterator<TData>;
}

/**
 * Create a tree data structure by adding TData items to a root node
 * @param items Items with segment information to build the tree with
 * @returns Root node of the tree
 */
export default function createTree<TData>({ items, getSegmentIterator }: Props<TData>): TreeNode<TData> {
  const idGenerator = new BasicIDGenerator()

  const id = idGenerator.next()
  const rootNode = new ConcreteNode<TData>(id, 'root')

  items.forEach((item) => {
    addToTree(item, getSegmentIterator)
  })

  function addToTree(item: TData, getSegmentIterator: GetSegmentIterator<TData>) {
    const nameIterator = getSegmentIterator(item)
    addToNodeRecursively({
      idGenerator,
      nameIterator,
      data: item,
      node: rootNode,
    })
  }

  return rootNode

}
