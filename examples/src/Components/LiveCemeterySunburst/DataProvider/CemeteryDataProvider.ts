import { DataProvider, SunburstItemNode, APIResponse } from "../../../sunburstLibrary";

export class CemeteryDataProvider implements DataProvider<SunburstItemNode[]> {
    private url: string = "http://localhost:5164/api/v1/Cemetery/summary?id="

    constructor(private readonly baseID: number = 16) { }

    get() {
        return fetch(this.url + this.baseID, {
            method: "GET"
        })
            .then(response => response.json())
            .then((response: APIResponse<SunburstItemNode[]>) => response).catch((error) => console.error(error));
    }
}
