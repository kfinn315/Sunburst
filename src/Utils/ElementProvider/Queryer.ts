import { MutableRefObject } from "react";

export interface Queryer {
  querySelector<T extends Element>(query: string): T | null | undefined;
  querySelectorAll<T extends Element>(query: string): Array<T> | undefined;
}

export class RefQueryer<TRef extends Element> implements Queryer {
  constructor(private readonly ref: MutableRefObject<TRef | null>) { }
  querySelector<T extends Element>(query: string): T | null | undefined {
    return this.ref.current?.querySelector<T>(query)
  }
  querySelectorAll<T extends Element>(query: string): T[] | undefined {
    if (this.ref.current) {
      const x = this.ref.current.querySelectorAll<T>(query)
      return Array.from(x)
    }
    return undefined
  }
}