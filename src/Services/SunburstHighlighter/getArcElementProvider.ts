import { SunburstItemTreeNode } from '../../Types'
import { IElementProvider } from '../../Utils/ElementProvider'
import { getElementProvider } from '../../Utils/ElementProvider/getElementProvider'
import { arcSelectorProvider } from './arcSelectorProvider'

export function getArcElementProvider(
  ref: React.MutableRefObject<SVGGElement | null>,
): IElementProvider<SunburstItemTreeNode, SVGPathElement> {
  return getElementProvider<SunburstItemTreeNode, SVGGElement, SVGPathElement>(ref, arcSelectorProvider)
}
