
/**
 * Add and remove elements from a group
 */
export interface ElementGroup<TElement> {
  add: (elements: TElement[]) => void;
  remove: (elements: TElement[]) => void;
}
