import { SunburstItemTreeNode } from '../../Types'
import { SelectorProvider } from '../../Utils/ElementProvider'

export const arcSelectorProvider: SelectorProvider<SunburstItemTreeNode> = {
  getAll: () => '.arc>path', //select all paths
  get: (item) => `.arc>path[data-id="${String(item.id)}"]`,
}
