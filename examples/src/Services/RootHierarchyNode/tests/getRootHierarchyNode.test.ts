import { HierarchyNode } from "d3";
import { getRootHierarchyNode } from "../getRootHierarchyNode";
import { TreeNode } from "../../Tree";
import { mock } from "jest-mock-extended";

type T = { name: string }

describe("getRootHierarchyNode", () => {
    const items: T[] = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];

    const createTree = jest.fn(() => {
        return mock<TreeNode<T>>()
    });

    const getHierarchyNode = jest.fn(() => {
        return mock<HierarchyNode<TreeNode<T>>>()
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call createTree with the correct items", () => {
        // Act
        getRootHierarchyNode(items, createTree, getHierarchyNode);

        // Assert
        expect(createTree).toHaveBeenCalledTimes(1);
        expect(createTree).toHaveBeenCalledWith(items);
    });

    it("should call getHierarchyNode with the root node returned by createTree", () => {
        // Arrange
        const rootNode: TreeNode<T> = mock<TreeNode<T>>()
        createTree.mockReturnValueOnce(rootNode);

        // Act
        getRootHierarchyNode(items, createTree, getHierarchyNode);

        // Assert
        expect(getHierarchyNode).toHaveBeenCalledTimes(1);
        expect(getHierarchyNode).toHaveBeenCalledWith(rootNode);
    });

    it("should return the result of getHierarchyNode", () => {
        // Arrange
        const hierarchyNode = mock<HierarchyNode<TreeNode<T>>>()
        getHierarchyNode.mockReturnValueOnce(hierarchyNode);

        // Act
        const result = getRootHierarchyNode(items, createTree, getHierarchyNode);

        // Assert
        expect(result).toBe(hierarchyNode);
    });
});
