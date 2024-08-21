import { HasID } from "../../Types";
import { AncestorHighlighterFactory } from "../AncestorHighlighter";
import { arcSelectorProvider } from "./arcSelectorProvider";

export class SunburstHighlighterFactory<T extends HasID, U extends Element> extends AncestorHighlighterFactory<T, U> {
    constructor() {
        super(arcSelectorProvider)
    }
}
