import { HasID } from "../../../../Types";
import { SelectorGenerator } from "../..";

/**
 * Creates arc path selectors for a given item
 */

export const arcSelectorGenerator: SelectorGenerator<HasID> = {
    get(item: HasID) {
        return `.arc>path[data-id="${String(item.id)}"]`;
    },
    getAll() {
        return '.arc>path';
    }, //select all paths
};
