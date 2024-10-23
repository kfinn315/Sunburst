import { Arc } from 'd3'

export interface Arcs {
  standard: Arc<unknown, ArcCoordinates>
  padded: Arc<unknown, ArcCoordinates>
  zero: Arc<unknown, ArcCoordinates>
}

export interface ArcCoordinates {
  x0: number
  y0: number
  x1: number
  y1: number
}
