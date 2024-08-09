//@ts-nocheck

// Here are some test cases that you can consider for the getElementProvider function:

import { MutableRefObject } from "react"
import { IElementProvider, SelectorProvider } from "../Types";
import { getElementProvider } from "../getElementProvider";
import { jest } from "@jest/globals"

// Test the basic structure of the returned element provider object:

// Verify that the returned object has properties get and getAll.
// Check that get and getAll are functions.
// Test the get function:

// Provide a valid item and verify that it returns the corresponding element based on the selector.
// Provide an undefined or null item and verify that it returns null.
// Mock the querySelector method to return null and verify that it returns null when no element is found.
// Test the getAll function:

// Verify that it returns an array of elements based on the selector.
// Mock the querySelectorAll method to return an empty NodeList and verify that it returns an empty array.
// Mock the querySelectorAll method to return a non-empty NodeList and verify that it returns an array of elements.
// Test different input types:

// Provide different types of items and verify that the function handles them correctly.
// Test with different types of element references (e.g., HTMLDivElement, HTMLElement) to ensure compatibility.
// Test edge cases and error handling:

// Test with an empty ref object and verify that it returns null or an empty array when accessing elements.
// Test with a selector that does not match any elements and verify that it returns null or an empty array.
// Remember to import the necessary types/interfaces from the ./Types module and mock the necessary methods for testing.

// describe('getElementProvider', () => {
//     let ref: MutableRefObject<T>;
//     let selectorProvider: SelectorProvider<TInput>
//     beforeEach(() => {
//         ref = { current: {} }
//         selectorProvider = {}
//     })
//     describe('get', () => {
//         it('should return an Element for the specified item', () => {
//             const elementProvider = getElementProvider(ref, selectorProvider)
//             const item = undefined;
//             const result = elementProvider.get(item)
//             expect()
//         })
//     })
// })

// // Mock the Element type

describe('getElementProvider', () => {
    const MockElement: Element = document.createElement("a");

    // Create a mock ref object
    const mockRef: MutableRefObject<Element | null> = {
        current: MockElement
    };
    let querySelectorSpy: unknown
    beforeEach(() => {
        querySelectorSpy = jest.spyOn<Element>(MockElement, "querySelector")
    })

    // Create a mock selector provider
    const mockSelectorProvider: SelectorProvider<unknown> = {
        get: jest.fn(),
        getAll: jest.fn(),
    };

    it('should return an element provider object with the correct structure', () => {
        // Act
        const elementProvider: IElementProvider<unknown, Element> = getElementProvider(
            mockRef,
            mockSelectorProvider
        );

        // Assert
        expect(elementProvider).toHaveProperty('get');
        expect(elementProvider).toHaveProperty('getAll');
        expect(typeof elementProvider.get).toBe('function');
        expect(typeof elementProvider.getAll).toBe('function');
    });

    it('should retrieve the element for the specified item', () => {
        // Arrange
        const mockItem = {};

        const mockSelector = "mockSelectorTest"
        mockSelectorProvider.get = jest.fn().mockReturnValue(mockSelector)

        const mockReturnValue = { returnValue: true }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        querySelectorSpy.mockReturnValue(mockReturnValue)

        // Act
        const elementProvider: IElementProvider<unknown, Element> = getElementProvider(
            mockRef,
            mockSelectorProvider
        );
        const element = elementProvider.get(mockItem);

        // Assert
        expect(mockSelectorProvider.get).toHaveBeenCalledWith(mockItem);
        expect(querySelectorSpy).toHaveBeenCalledWith(mockSelector)
        expect(element).toBeDefined();
        expect(element).toBe(mockReturnValue);
    });

    it('should return null if the item is undefined', () => {
        // Arrange
        const mockItem = undefined as unknown as Element;

        // Act
        const elementProvider: IElementProvider<Element, Element> = getElementProvider(
            mockRef,
            mockSelectorProvider
        );
        const element = elementProvider.get(mockItem);

        // Assert
        expect(mockSelectorProvider.get).not.toHaveBeenCalled();
        expect(element).toBeNull();
    });

    //   it('should retrieve all elements based on the selector', () => {
    //     // Arrange
    //     // Mock the querySelectorAll method
    //     mockRef.current?.querySelector
})