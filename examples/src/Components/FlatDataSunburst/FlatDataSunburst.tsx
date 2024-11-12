import "./FlatDataSunburst.css";

import { HierarchyNode } from 'd3'

import { getColorScale, SunburstHighlighter, SunburstItem, ConcreteSunburstContainer } from "../../sunburstLibrary";
import { TreeNode } from "../../Services/Tree";
import { flatData } from "./flatData";
import { FlatDataHierarchy as FlatDataHierarchy } from "../../Services/Hierarchy/Implementations/FlatDataHierarchy";

function FlatDataSunburst() {
    const centerColor = 'blue'
    const colorGradient: [string, string] = ['blue', 'red']
    const colorScale = getColorScale(flatData, (item) => item.color, colorGradient)
    const svgDimension = 1400
    const rootHierarchyNode: HierarchyNode<TreeNode<SunburstItem>> = new FlatDataHierarchy().createNode(flatData)
    return (
        <>
            <ConcreteSunburstContainer
                dimensions={{ width: svgDimension, height: svgDimension }}
                highlighterFactory={(ref) => new SunburstHighlighter(ref, 'highlight')}
                rootHierarchyNode={rootHierarchyNode}
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
