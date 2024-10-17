import { ElementGroup } from '../../Utils/CSSClassModifier/Types';
import { Highlighter, ElementListProvider } from "./Types";
import { MutableRefElement } from '../../Types/MutableRefElement';

/**
 *
 * Uses the elementProvider and highlighter to highlight elements
 * @class
 * @implements {Highlighter<TInput, TElement = Element>}
 * @template TInput Type to be highlighted
 * @template TElement Type of Document element whose css class is to be modified
 */
export default class DefaultHighlighter<TInput, TElement extends Element = Element> implements Highlighter<TInput> {
  constructor(
    private readonly ref: MutableRefElement,
    private readonly elementProvider: ElementListProvider<TInput, TElement>,
    private readonly highlightGroup: ElementGroup<TElement>) { }
  clear(): void {
    this.highlightGroup.remove(this.elementProvider.getAll(this.ref));
  }
  highlight(item: TInput): void {
    this.highlightGroup.add(this.elementProvider.get(this.ref, item));
  }
}
