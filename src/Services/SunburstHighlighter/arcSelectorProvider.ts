import { HasID } from '../../Types'
import { SelectorProvider } from '../../Utils/ElementProvider'

export const arcSelectorProvider: SelectorProvider<HasID> = {
  get(item: HasID) {
    return `.arc>path[data-id="${String(item.id)}"]`
  },
  getAll() {
    return '.arc>path'
  }, //select all paths
}
