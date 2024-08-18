import { KNode } from './KNode'
import { IDGenerator } from './Types'

interface Props<TData> {
  idGenerator: IDGenerator
  nameIterator: IterableIterator<string>
  node: KNode<TData>
  data: TData
}

export function addToNodeRecursively<TData>({
  idGenerator,
  nameIterator,
  node,
  data,
}: Props<TData>) {
  if (node === null) {
    throw Error('node is null')
  }

  const nameResult = nameIterator.next()

  if (nameResult.done) {
    node.data = data
    return
  } else {
    const name = nameResult.value

    let childNode = node.findChild(name)

    if (childNode === undefined) {
      const id = idGenerator.next()

      childNode = new KNode<TData>(id, name)
      node.addChild(childNode)
    }

    addToNodeRecursively({
      idGenerator,
      nameIterator,
      node: childNode,
      data,
    })
  }
}
