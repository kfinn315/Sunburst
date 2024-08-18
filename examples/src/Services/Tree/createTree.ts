import { addToNodeRecursively } from './addToNodeRecursively'
import { KNode } from './KNode'
import { getIDGenerator } from './getIDGenerator'
import { TreeNode } from './Types'
import { GetSegmentIterator } from "./GetSegmentIterator";

/**
 * Create a tree data structure by adding TData items to a root node
 * @param items Items with segment information to build the tree with
 * @returns Root node of the tree
 */
export default function createTree<TData>(
  items: readonly TData[],
  getSegmentIterator: GetSegmentIterator<TData>
): TreeNode<TData> {
  const idGenerator = getIDGenerator()

  const id = idGenerator.next()
  const rootNode = new KNode<TData>(id, 'root')

  items.forEach((item) => {
    addToTree(item, getSegmentIterator)
  })

  return rootNode

  function addToTree(item: TData, getSegmentIterator: (item: TData) => IterableIterator<string>) {
    const nameIterator = getSegmentIterator(item)
    addToNodeRecursively({
      idGenerator,
      nameIterator,
      data: item,
      node: rootNode,
    })
  }
}
