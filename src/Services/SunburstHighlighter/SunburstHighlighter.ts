import { SunburstItemTreeNode } from "../../Types";
import { HighlighterWrapper, IHighlighterWrapper } from "../Highlighter";
import { getSunburstHighlighter } from "./getSunburstHighlighter";

export class SunburstHighlighter extends HighlighterWrapper<SunburstItemTreeNode> implements IHighlighterWrapper<SunburstItemTreeNode> {
    constructor() {
        super(getSunburstHighlighter)
    }
}
