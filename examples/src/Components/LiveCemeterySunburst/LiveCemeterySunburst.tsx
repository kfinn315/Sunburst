import "./LiveCemeterySunburst.css";

import { HierarchyNode } from 'd3'

import { getRootHierarchyNode } from '../../Services/SunburstItemRootHierarchyNode'
import { getColorScale, SunburstItem, AsyncSunburst } from "../../sunburstLibrary";
import { TreeNode } from "../../Services/Tree";
import { DataProvider, APIResponse } from "../../../../src/Components/AsyncSunburst";
import { flatData } from "../FlatDataSunburst/flatData";


const dataProvider: DataProvider<HierarchyNode<TreeNode<SunburstItem>>> = {
    get() {
        const executor = (resolve, reject) => {
            setTimeout(() => {
                // //wait 1 second
                const response: APIResponse<HierarchyNode<TreeNode<SunburstItem>>> = {
                    success: true,
                    data: getRootHierarchyNode(flatData)
                }
                console.info('dataProvider resolving')
                resolve(response)
                // reject('error message')
            }, 5000)
            console.info('dataProvider resolving')
        }

        return new Promise<APIResponse<HierarchyNode<TreeNode<SunburstItem>>>>(executor)
    },
}

function LiveCemeterySunburst() {
    const colorGradient: [string, string] = ['orange', 'red']
    const colorScale = getColorScale(flatData, (item) => item.color, colorGradient)

    const getArcColor = (d: HierarchyRectangularNode<SunburstItemTreeNode>) =>
        d.data.data?.color ? colorScale(d.data.data.color) : 'pink'

    return (
        <>
            <AsyncSunburst<HierarchyNode<TreeNode<SunburstItem>>>
                dataProvider={dataProvider}
                isNodeClickable={false}
                getArcColor={getArcColor}
                // highlighterFactory={{ get: (ref) => new SunburstHighlighter(ref, 'highlight') }}
                dataProvider={dataProvider}
                colorScale={colorScale}
                centerColor={'blue'}
                radius={70}
            />
            <div className="data">
                <h2>Data</h2>
            </div>
        </>
    )
}

export default LiveCemeterySunburst
