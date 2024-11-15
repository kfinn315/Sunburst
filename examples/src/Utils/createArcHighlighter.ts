import { AncestorHighlighter, SunburstItemWithChildren, MutableRefElement } from "../sunburstLibrary";

export function createArcHighlighter(ref: MutableRefElement): AncestorHighlighter<SunburstItemWithChildren, Element> {
    return new AncestorHighlighter<SunburstItemWithChildren>(ref,
        {
            get(item) { return `.arcs path[data-id="${String(item.id)}"]`; },
            getAll() { return '.arcs path'; }
        },
        'highlight');
}
