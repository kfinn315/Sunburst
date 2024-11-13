import { DataProvider, SunburstItemNode, getColorScale } from "../../sunburstLibrary";
import { CemeteryAPI } from "./CemeteryAPI";
import { Cemetery } from "./Types";

interface RequestData {
    id?: number
    depth?: number
}
export class CemeteryDataProvider implements DataProvider<SunburstItemNode, RequestData> {
    private readonly api = new CemeteryAPI()
    constructor() { }

    get(request: RequestData = {}) {
        const { id, depth } = request
        if (depth === undefined || depth === 0) {
            return this.fetchAllCemeteries()
        }

        return this.fetchSummary(id)
    }

    private fetchAllCemeteries() {
        return this.api.getAllCemeteries().then((data: Cemetery[]) => {
            const rootNode: SunburstItemNode = {
                id: 'root', name: 'root', children: data.filter((v, ix) => ix < 10).map(c => ({ id: c.id, name: c.name, color: 'red', size: Math.floor(Math.random() * 10) }))
            }
            return rootNode
        }).catch(reason => {
            if (reason instanceof Error) {
                throw reason;
            } else {
                throw Error(reason);
            }
        });
    }

    private fetchSummary(id: number): Promise<SunburstItemNode> {

        function modifyResponseData(items: SunburstItemNode[] | undefined): SunburstItemNode[] | undefined {

            // Add color to items based on id value, with a linear scale using ``colorRange`` as the range. 
            // Items where id < 0, which will be given ```unknownColor```.
            function addColorProperty({ colorRange, unknownColor, items }: { colorRange: [string, string]; unknownColor: string; items: SunburstItemNode[] }): SunburstItemNode[] {
                const getColorDomainValue = (item: SunburstItemNode) => {
                    return item.id < 0 ? NaN : item.id
                }

                const colorScale = getColorScale<SunburstItemNode>(items, getColorDomainValue, colorRange).unknown(unknownColor)

                const getColorValue = (item: SunburstItemNode) => colorScale(getColorDomainValue(item))

                function getChildren(children: SunburstItemNode[] | undefined) {
                    return addColorProperty({ colorRange, unknownColor, items: children })
                }

                return items.map(item => ({ ...item, color: getColorValue(item), children: item.children ? getChildren(item.children) : undefined }))
            }

            if (!items) return undefined;
            const colorGradient: [string, string] = ['orange', 'blue']
            const unknownColor: string = 'black'

            const withColor = addColorProperty({ colorRange: colorGradient, unknownColor, items })

            //modify child ids to be unique
            return withColor.map(x => ({ ...x, name: x.name + " " + x.size, size: x.children ? 0 : x.size, children: x.children?.map(y => ({ ...y, id: x.id + "." + y.id })) }))
        }

        return this.api.getCemetery(id).then(data => {
            const rootNode = { id: 'root', name: data?.name + " " + data?.size, size: 0, children: modifyResponseData(data?.children), }; //create a root node to contain the response data array
            return rootNode;
        }).catch(reason => {
            if (reason instanceof Error) {
                throw reason;
            } else {
                throw Error(reason);
            }
        });
    }
}
