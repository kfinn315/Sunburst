import { MutableRefElement } from "../../Types/MutableRefElement";
import { Highlighter } from "./Types";

export interface HighlighterFactory<TIn> {
    get(ref: MutableRefElement): Highlighter<TIn>;
}
