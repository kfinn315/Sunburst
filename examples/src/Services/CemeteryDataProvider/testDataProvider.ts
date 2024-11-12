import { HierarchyNode } from "d3";
import { APIResponse, DataProvider, SunburstItemNode, SunburstItemTreeNode } from "../../sunburstLibrary";
import { data0, data1 } from "./Data/data";

export const testDataProvider0: DataProvider<SunburstItemNode> = {
    get() {
        const executor = (resolve) => {
            console.info('dataProvider fetching');
            //wait 
            setTimeout(() => {
                const response: APIResponse<SunburstItemNode> = {
                    success: true,
                    data: data0
                };
                console.info('dataProvider resolving');
                resolve(response);
                // reject('error message')
            }, 1000);
        };

        return new Promise<APIResponse<SunburstItemNode>>(executor);
    },
};

export const testDataProvider1: DataProvider<HierarchyNode<SunburstItemNode>> = {
    get() {
        const executor = (resolve) => {
            console.info('dataProvider fetching');
            //wait 
            setTimeout(() => {
                const response: APIResponse<SunburstItemTreeNode> = {
                    success: true,
                    data: data1
                };
                console.info('dataProvider resolving');
                resolve(response);
                // reject('error message')
            }, 1000);
            // console.info('dataProvider resolving');
        };

        return new Promise<APIResponse<SunburstItemNode>>(executor);
    },
};
