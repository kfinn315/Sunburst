import { HierarchyRectangularNode } from "d3";
import { HasChildren } from "../../Types";

export interface DataProvider<T> {
    get(): Promise<APIResponse<T>>;
}

export interface APIResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
};

export type GetHierarachyNodeDescendants<T extends HasChildren> = (data: T, layoutRadius: number) => HierarchyRectangularNode<T>[]
