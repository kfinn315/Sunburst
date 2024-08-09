import { SunburstItem } from "../../Types";
import { HighlighterWrapper, IHighlighterWrapper } from "../Highlighter";
import { getSunburstHighlighter } from "./getSunburstHighlighter";

export class SunburstHighlighter extends HighlighterWrapper<SunburstItem> implements IHighlighterWrapper<SunburstItem> {
    constructor() {
        super(getSunburstHighlighter)
    }
}
