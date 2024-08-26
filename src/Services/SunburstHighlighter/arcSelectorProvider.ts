import { SelectorProvider } from '../../Utils/ElementProvider'
import { HasID } from '../../Types';

export const arcSelectorProvider: SelectorProvider<HasID> = {
  get(item: HasID) {
    return `.arc>path[data-id="${String(item.id)}"]`
  },
  getAll() {
    return '.arc>path'
  }, //select all paths
}

