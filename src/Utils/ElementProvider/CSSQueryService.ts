import { QueryService } from "./Types";
import { MutableRefElement } from "../../Types/MutableRefElement";

/**
 * Call ParentNode methods querySelector and querySelectorAll on the ref Object
 *
 * @export
 * @class ElementRef
 * @implements {QueryService<string>}
 * @template TRef
 */
export default class CSSQueryService implements QueryService<string> {

  query<T extends Element>(ref: MutableRefElement, query: string): T | null | undefined {
    return ref.current?.querySelector<T>(query);
  }

  queryAll<T extends Element>(ref: MutableRefElement, query: string): T[] | undefined {
    const currentRef = ref.current;
    if (currentRef) {
      const nodes = currentRef.querySelectorAll<T>(query);
      return Array.from(nodes);
    }
    return undefined;
  }
}
