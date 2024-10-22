
import { HasID, MutableRefElement } from '../../../../Types';
import { AncestorHighlighter } from '../AncestorHighlighter';
import { arcSelectorGenerator } from './arcSelectorGenerator';

export class SunburstHighlighter<T extends HasID, U extends Element> extends AncestorHighlighter<T, U> {
    constructor(ref: MutableRefElement, cssClass: string) {
        super(ref, arcSelectorGenerator, cssClass);
    }
}
