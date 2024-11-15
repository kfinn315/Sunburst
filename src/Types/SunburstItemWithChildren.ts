import { HasChildren } from './HasChildren'
import { SunburstItem } from './SunburstItem'

export interface SunburstItemWithChildren extends SunburstItem, HasChildren<SunburstItem> {
  children?: SunburstItemWithChildren[]
}
