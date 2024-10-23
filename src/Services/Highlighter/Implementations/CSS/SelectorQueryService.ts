import { MutableRefElement } from "../../../../Types";
import { QueryService } from "../../Types";

/**
 * Calls ParentNode methods querySelector and querySelectorAll on the ref Element Object
 *
 * @export
 * @class ElementRef
 * @implements {QueryService<string>}
 * @template TRef
 */
export default class SelectorQueryService implements QueryService<string> {
  /**
   *
   */
  constructor(private readonly ref: MutableRefElement) { }

  query<T extends Element>(query: string): T | null | undefined {
    return this.ref.current?.querySelector<T>(query);
  }

  queryAll<T extends Element>(query: string): T[] | undefined {
    const currentRef = this.ref.current;
    if (currentRef) {
      const nodes = currentRef.querySelectorAll<T>(query);
      return Array.from(nodes);
    }
    return undefined;
  }
}
