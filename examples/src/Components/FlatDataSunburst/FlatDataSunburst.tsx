import "./FlatDataSunburst.css";

import { JSONTree } from 'react-json-tree'
import { HierarchyNode } from 'd3'
import { SunburstItem, TreeNode, SunburstItemSunburstContainer, arcSelectorProvider, SunburstItemTreeNode, SunburstHighlighterFactory } from 'kfinn315_sunburst';

import { flatData } from '../../data'
import { getColorScale } from '../../Utils/getColorScale'
import { getRootHierarchyNode } from '../../Services/SunburstItemRootHierarchyNode'

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
                highlighterFactory={new SunburstHighlighterFactory()}
                rootNode={rootHierarchyNode}
                colorScale={colorScale}
                centerColor={centerColor}
            />
            <div className="data">
                <h2>Data</h2>
                <JSONTree data={flatData} />
            </div>
        </>
    )
}

export default FlatDataSunburst
