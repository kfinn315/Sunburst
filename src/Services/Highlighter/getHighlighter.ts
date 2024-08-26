import { ElementListProvider, Highlighter } from './Types'
import { ICollectionClassModifier } from '../../Utils/CSSClassModifier/CollectionClassModifier';
import { HighlightCollectionClassModifier } from './HighlightCollectionClassModifier';

/**
 * Adds the "highlight" class to the html elements given by the elementProvider
 * @param elementProvider
 * @returns IAncestorHighlighter object
 */
export default function getHighlighter<TDatum, TElement extends Element = Element>(
  elementProvider: ElementListProvider<TDatum, TElement>,
  classModifier: ICollectionClassModifier<TElement> = HighlightCollectionClassModifier
): Highlighter<TDatum> {
  return {
    clear: () => {
      classModifier.remove(elementProvider.getAll())
    },
    highlight: (item: TDatum) => {
      const pathElements = elementProvider.get(item)
      classModifier.add(pathElements)
    },
  }
}