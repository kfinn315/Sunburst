import { SunburstItem } from "kfinn315_sunburst";

export function getSegmentIterator(item: SunburstItem): IterableIterator<string> {
  return item.name.split('.').values();
}
