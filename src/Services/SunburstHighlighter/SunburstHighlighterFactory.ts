import { HasID } from "../../Types";
import { AncestorHighlighterFactory } from "../AncestorHighlighter";
import { arcSelectorGenerator } from "./arcSelectorGenerator";

/**
 * Create a highlighter factory that adds and removes the CSS class 'highlight' to arc elements
 *
 * @export
 * @class SunburstHighlighterFactory
 * @extends {AncestorHighlighterFactory<T, U>}
 * @template T
 * @template U
 */
export class SunburstHighlighterFactory<T extends HasID, U extends Element> extends AncestorHighlighterFactory<T, U> {
    constructor() {
        super(arcSelectorGenerator, "highlight")
    }
}
