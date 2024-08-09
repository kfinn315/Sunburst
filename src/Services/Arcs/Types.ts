import { Arc } from 'd3'

export interface Arcs {
  padded: Arc<unknown, ArcCoordinates>
  basic: Arc<unknown, ArcCoordinates>
  zero: Arc<unknown, ArcCoordinates>
}

export interface ArcCoordinates {
  x0: number
  y0: number
  x1: number
  y1: number
}
