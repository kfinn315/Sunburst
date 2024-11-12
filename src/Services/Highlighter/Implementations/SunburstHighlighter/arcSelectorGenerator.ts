import { HasID } from "../../../../Types";
import { SelectorGenerator } from "../..";

/**
 * Creates arc path selectors for a given item
 */

export const arcSelectorGenerator: SelectorGenerator<HasID> = {
    get(item: HasID) {
        return `.arcs path[data-id="${String(item.id)}"]`;
    },
    getAll() {
        return '.arcs path';
    }, //select all paths
};
