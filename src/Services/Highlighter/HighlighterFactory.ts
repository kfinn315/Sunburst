import { Highlighter } from "./Types";
import { Queryer } from "../../Utils/ElementProvider";

export interface HighlighterFactory<T> {
    get(queryer: Queryer): Highlighter<T>;
}
