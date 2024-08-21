import { SelectorProvider } from '../../Utils/ElementProvider'

export const arcSelectorProvider: SelectorProvider<{ id: number }> = {
  get(item: { id: number }) {
    return `.arc>path[data-id="${String(item.id)}"]`
  },
  getAll() {
    return '.arc>path'
  }, //select all paths
}
