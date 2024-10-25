import { SunburstItem } from "../../sunburstLibrary";
import { createTree } from "../Tree";
import { getSegmentIterator } from "./getSegmentIterator";


export function createSunburstItemTree(items: readonly SunburstItem[]) {
    return createTree(items, getSegmentIterator);
}
