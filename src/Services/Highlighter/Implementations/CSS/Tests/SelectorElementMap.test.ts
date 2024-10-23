import { QueryService, SelectorGenerator } from "../../../Types";
import SelectorElementMap from "../SelectorElementMap";
import { mock } from "jest-mock-extended";

describe('SelectorElementMap', () => {
    describe('get', () => {
        it('should call selectorGenerator.get', () => {
            // Arrange
            const mockSelectorGenerator = mock<SelectorGenerator<unknown>>()
            const mockQueryService = mock<QueryService<string>>()
            const selectorElementMap = new SelectorElementMap(
                mockQueryService,
                mockSelectorGenerator
            );
            const input = {};

            // Act
            selectorElementMap.get(input);

            // Assert
            expect(mockSelectorGenerator.get).toHaveBeenCalled()
        });

        it('should call queryService.query', () => {
            // Arrange
            const mockSelectorGenerator = mock<SelectorGenerator<unknown>>()
            const mockQueryService = mock<QueryService<string>>()
            const selectorElementMap = new SelectorElementMap(
                mockQueryService,
                mockSelectorGenerator
            );
            const input = {};

            // Act
            selectorElementMap.get(input);

            // Assert
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockQueryService.query).toHaveBeenCalled()
        });

        it('should return null if the input is undefined', () => {
            // Arrange
            const mockSelectorGenerator = mock<SelectorGenerator<unknown>>()
            const mockQueryService = mock<QueryService<string>>()
            const selectorElementMap = new SelectorElementMap(
                mockQueryService,
                mockSelectorGenerator
            );
            const input = undefined;

            // Act
            const element = selectorElementMap.get(input);

            // Assert
            expect(element).toBeNull();
        });
    })

    describe('values', () => {
        it('should call selectorGenerator.getAll', () => {
            // Arrange
            const mockSelectorGenerator = mock<SelectorGenerator<unknown>>()
            const mockQueryService = mock<QueryService<string>>()
            const selectorElementMap = new SelectorElementMap(
                mockQueryService,
                mockSelectorGenerator
            );

            // Act
            selectorElementMap.values();

            // Assert
            expect(mockSelectorGenerator.getAll).toHaveBeenCalled()
        });

        it('should call queryService.queryAll', () => {
            // Arrange
            const mockSelectorGenerator = mock<SelectorGenerator<unknown>>()
            const mockQueryService = mock<QueryService<string>>()
            const selectorElementMap = new SelectorElementMap(
                mockQueryService,
                mockSelectorGenerator
            );

            // Act
            selectorElementMap.values();

            // Assert
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockQueryService.queryAll).toHaveBeenCalled()
        });
    })
})
