//@ts-nocheck
import { jest } from "@jest/globals"
import { ElementMap, QueryService, SelectorGenerator } from "../../../Types";
import SelectorElementMap from "../SelectorElementMap";

describe('SelectorElementMap', () => {
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
        const elementProvider: ElementMap<unknown, Element> = new SelectorElementMap(
            mockQueryer,
            mockSelectorProvider
        );

        // Assert
        expect(elementProvider).toHaveProperty('get');
        expect(elementProvider).toHaveProperty('values');
        expect(typeof elementProvider.get).toBe('function');
        expect(typeof elementProvider.values).toBe('function');
    });

    it('should retrieve the element for the specified item', () => {
        // Arrange
        const ref = { current: document.createElement('div') }
        const mockItem = {};

        const mockSelector = "mockSelectorTest"
        mockSelectorProvider.get = jest.fn().mockReturnValue(mockSelector)

        const mockReturnValue = { returnValue: true }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        querySelectorSpy.mockReturnValue(mockReturnValue)

        // Act
        const elementProvider: ElementMap<unknown, Element> = new SelectorElementMap(
            mockQueryer,
            mockSelectorProvider
        );
        const element = elementProvider.get(ref, mockItem);

        // Assert
        expect(mockSelectorProvider.get).toHaveBeenCalledWith(mockItem);
        expect(querySelectorSpy).toHaveBeenCalledWith(ref, mockSelector)
        expect(element).toBeDefined();
        expect(element).toBe(mockReturnValue);
    });

    it('should return null if the item is undefined', () => {
        // Arrange
        const ref = { current: document.createElement('div') }
        const mockItem = undefined as unknown as Element;

        // Act
        const elementProvider: ElementMap<Element, Element> = new SelectorElementMap(
            mockQueryer,
            mockSelectorProvider
        );
        const element = elementProvider.get(ref, mockItem);

        // Assert
        expect(mockSelectorProvider.get).not.toHaveBeenCalled();
        expect(element).toBeNull();
    });

    //   it('should retrieve all elements based on the selector', () => {
    //     // Arrange
    //     // Mock the querySelectorAll method
    //     mockRef.current?.querySelector
})