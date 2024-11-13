import { APIResponse, SunburstItemNode } from "../../sunburstLibrary";
import { Cemetery } from "./Types";

export class CemeteryAPI {
    private summaryURL: string = "http://localhost:5164/api/v1/Cemetery/summary?id=";
    private cemeteryURL: string = "http://localhost:5164/api/v1/Cemetery";

    getAllCemeteries(): Promise<Cemetery[]> {
        return fetch(this.cemeteryURL, { method: 'GET' }).then(response => response.json()).then((response: APIResponse<Cemetery[]>): APIResponse<SunburstItemNode> => {
            if (!response.success) {
                throw Error(response.message);
            }
            if (response.data === undefined) {
                throw Error('data is undefined');
            }
            return response.data;
        }).catch(reason => {
            if (reason instanceof Error) {
                throw reason;
            } else {
                throw Error(reason);
            }
        });
    }
    getCemetery(id: number): Promise<SunburstItemNode> {
        return fetch(this.summaryURL + id, { method: "GET" })
            .then(response => response.json())
            .then((response: APIResponse<SunburstItemNode>): APIResponse<SunburstItemNode> => {
                if (!response.success) {
                    throw Error(response.message);
                }
                // const rootNode = { id: 'root', name: response.data?.name + " " + response.data?.size, size: 0, children: modifyResponseData(response.data?.children), }; //create a root node to contain the response data array
                if (response.data === undefined)
                    throw Error('data is undefined');
                return response.data;
            }).catch(reason => {
                if (reason instanceof Error) {
                    throw reason;
                } else {
                    throw Error(reason);
                }
            });
    }
}
