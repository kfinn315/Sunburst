import { MutableRefElement } from '../../../Types';
import { ElementGroup, ElementListMap, Highlighter } from '../Types';

/**
 *
 * Uses the elementProvider and highlighter to highlight elements
 * @class
 * @implements {Highlighter<TInput, TElement = Element>}
 * @template TInput Type to be highlighted
 * @template TElement Type of Document element whose css class is to be modified
 */
export default class BaseHighlighter<TInput, TElement extends Element = Element> implements Highlighter<TInput> {
  constructor(
    private readonly ref: MutableRefElement,
    private readonly map: ElementListMap<TInput, TElement>,
    private readonly highlightGroup: ElementGroup<TElement>) { }
  clear(): void {
    const elements = this.map.values(this.ref);
    this.highlightGroup.remove(elements);
  }
  add(item: TInput): void {
    const elements = this.map.get(this.ref, item);
    this.highlightGroup.add(elements);
  }
}
