import { HierarchyNode } from 'd3'

export type SunburstEvent<TDatum> = (
  event: MouseEvent,
  d: HierarchyNode<TDatum>,
) => void
