import { ConcreteNode } from './ConcreteNode'
import { IDGenerator } from './Types'

interface Props<TData> {
  idGenerator: IDGenerator
  nameIterator: IterableIterator<string>
  node: ConcreteNode<TData>
  data: TData
}

export function addToNodeRecursively<TData>({ idGenerator, nameIterator, node, data, }: Props<TData>) {
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

      childNode = new ConcreteNode<TData>(id, name)
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
