import { HierarchyNode } from "d3";
import { APIResponse, DataProvider, SunburstItemWithChildren, SunburstItemTreeNode } from "../../sunburstLibrary";
import { data0, data1 } from "./Data/data";

export const testDataProvider0: DataProvider<SunburstItemWithChildren> = {
    get() {
        const executor = (resolve) => {
            console.info('dataProvider fetching');
            //wait 
            setTimeout(() => {
                const response: APIResponse<SunburstItemWithChildren> = {
                    success: true,
                    data: data0
                };
                console.info('dataProvider resolving');
                resolve(response);
                // reject('error message')
            }, 1000);
        };

        return new Promise<APIResponse<SunburstItemWithChildren>>(executor);
    },
};

export const testDataProvider1: DataProvider<HierarchyNode<SunburstItemWithChildren>> = {
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

        return new Promise<APIResponse<SunburstItemWithChildren>>(executor);
    },
};
