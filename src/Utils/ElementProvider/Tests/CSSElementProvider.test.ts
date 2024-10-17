//@ts-nocheck
import { SelectorGenerator, ElementProvider, QueryService } from "../Types";
import CSSElementProvider from "../CSSElementProvider";
import { jest } from "@jest/globals"

describe('CSSElementProvider', () => {
    const MockElement: Element = document.createElement("a");

    // Create a mock ref object
    let querySelectorSpy: unknown
    let mockQueryer: QueryService<string>;
    beforeEach(() => {
        querySelectorSpy = jest.spyOn<Element>(MockElement, "querySelector")
        mockQueryer = {
            query: querySelectorSpy,
            queryAll: jest.fn()
        };
    })

    // Create a mock selector provider
    const mockSelectorProvider: SelectorGenerator<unknown> = {
        get: jest.fn(),
        getAll: jest.fn(),
    };

    it('should return an element provider object with the correct structure', () => {
        // Act
        const elementProvider: ElementProvider<unknown, Element> = new CSSElementProvider(
            mockQueryer,
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
        const elementProvider: ElementProvider<unknown, Element> = new CSSElementProvider(
            mockQueryer,
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
        const elementProvider: ElementProvider<Element, Element> = new CSSElementProvider(
            mockQueryer,
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