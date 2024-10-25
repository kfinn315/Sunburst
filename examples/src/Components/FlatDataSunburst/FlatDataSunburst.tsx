import "./FlatDataSunburst.css";

import { HierarchyNode } from 'd3'

import { flatData } from '../../data'
import { getColorScale } from '../../Utils/getColorScale'
import { getRootHierarchyNode } from '../../Services/SunburstItemRootHierarchyNode'
import { SunburstHighlighter, SunburstItem, SunburstItemSunburstContainer } from "../../sunburstLibrary";
import { TreeNode } from "../../Services/Tree";

function FlatDataSunburst() {
    const centerColor = 'blue'
    const colorGradient: [string, string] = ['blue', 'red']
    const colorScale = getColorScale(flatData, colorGradient)
    const svgDimension = 1400
    const rootHierarchyNode: HierarchyNode<TreeNode<SunburstItem>> = getRootHierarchyNode(flatData)
    return (
        <>
            <SunburstItemSunburstContainer
                dimensions={{ width: svgDimension, height: svgDimension }}
                highlighterFactory={{ get: (ref) => new SunburstHighlighter(ref, 'highlight') }}
                rootNode={rootHierarchyNode}
                colorScale={colorScale}
                centerColor={centerColor}
            />
            <div className="data">
                <h2>Data</h2>
            </div>
        </>
    )
}

export default FlatDataSunburst
