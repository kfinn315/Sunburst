import { SunburstItem } from "../../sunburstLibrary";

export function getSegmentIterator(item: SunburstItem): IterableIterator<string> {
  return item.name.split('.').values();
}
