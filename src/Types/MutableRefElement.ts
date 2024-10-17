import { MutableRefObject } from "react";


export type MutableRefElement<T extends Element = Element> = MutableRefObject<T | null>;
