import { HasChildren } from './HasChildren'
import { SunburstItem } from './SunburstItem'

export interface SunburstItemNode extends SunburstItem, HasChildren<SunburstItem> {
  children?: SunburstItemNode[]
}
