import { DataProvider, SunburstItemNode, APIResponse, getColorScale } from "../../../sunburstLibrary";

interface GetProps {
    id?: number;
    tier?: number;
}

export class CemeteryDataProvider implements DataProvider<SunburstItemNode> {
    private url: string = "http://localhost:5164/api/v1/Cemetery/summary?id="

    constructor(private readonly props: GetProps = { id: 2 }) { }

    get() {
        const { id } = this.props;
        return fetch(this.url + id, { method: "GET" })
            .then(response => response.json())
            .then((response: APIResponse<SunburstItemNode>): APIResponse<SunburstItemNode> => {
                if (!response.success) {
                    throw Error(response.message)
                }

                const rootNode = { id: 0, name: response.data?.name + " " + response.data?.size, size: 0, children: modifyResponseData(response.data?.children), } //create a root node to contain the response data array

                return { ...response, data: rootNode };
            }).catch(reason => {
                if (reason instanceof Error) {
                    throw reason
                } else {
                    throw Error(reason)
                }
            })
    }
}

function modifyResponseData(items: SunburstItemNode[] | undefined): SunburstItemNode[] | undefined {
    if (!items) return undefined;
    const colorGradient: [string, string] = ['orange', 'blue']
    const unknownColor: string = 'black'

    const withColor = addColorProperty({ colorRange: colorGradient, unknownColor, items })

    //modify child ids to be unique
    return withColor.map(x => ({ ...x, name: x.name + " " + x.size, size: x.children ? 0 : x.size, children: x.children?.map(y => ({ ...y, id: x.id + "." + y.id })) }))
}

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
