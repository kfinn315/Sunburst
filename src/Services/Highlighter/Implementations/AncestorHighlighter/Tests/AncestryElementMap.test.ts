import { AncestryElementMap } from "../AncestryElementMap";
import { ElementMap } from "../../../Types";
import { mock } from "jest-mock-extended";

describe('AncestryElementMap', () => {
  describe('get', () => {
    it('should call getAncestors on input item', () => {
      const elementMap = mock<ElementMap<unknown, unknown>>()
      const getAncestors = jest.fn()
      const testObject = new AncestryElementMap(elementMap, getAncestors)
      const inputItem = {}

      testObject.get(inputItem)

      expect(getAncestors).toHaveBeenCalledWith(inputItem)
    });

    it('should return undefined when input is undefined', () => {
      const elementMap = mock<ElementMap<unknown, unknown>>()
      const getAncestors = jest.fn()
      const testObject = new AncestryElementMap(elementMap, getAncestors)
      const inputItem = undefined

      const result = testObject.get(inputItem)

      expect(result).toBeUndefined()
    });

    it('should return empty list when getAncestors returns empty list', () => {
      const elementMap = mock<ElementMap<unknown, unknown>>()
      const getAncestors = jest.fn().mockReturnValue([])
      const testObject = new AncestryElementMap(elementMap, getAncestors)
      const inputItem = {}

      const result = testObject.get(inputItem)

      expect(result).toEqual([])
    });


    it('should not return any null values in list', () => {
      const elementMap = mock<ElementMap<unknown, unknown>>()
      elementMap.get.mockReturnValue(null)
      const getAncestors = jest.fn().mockReturnValue([])
      const testObject = new AncestryElementMap(elementMap, getAncestors)
      const inputItem = {}

      const result = testObject.get(inputItem)

      expect(result).not.toContain(null)
    });

    it('should not return any undefined values in list', () => {
      const elementMap = mock<ElementMap<unknown, unknown>>()
      elementMap.get.mockReturnValue(undefined)
      const getAncestors = jest.fn().mockReturnValue([])
      const testObject = new AncestryElementMap(elementMap, getAncestors)
      const inputItem = {}

      const result = testObject.get(inputItem)

      expect(result).not.toContain(undefined)
    });

    it('should call elementMap.get on each item returned by getAncestors method', () => {
      const elementMap = mock<ElementMap<unknown, unknown>>()
      elementMap.get.mockReturnValue(undefined)
      const ancestorReturnValue = [{ data: 'a' }, { data: 333 }]
      const getAncestors = jest.fn().mockReturnValue(ancestorReturnValue)
      const testObject = new AncestryElementMap(elementMap, getAncestors)
      const inputItem = {}

      testObject.get(inputItem)

      ancestorReturnValue.forEach(item => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(elementMap.get).toHaveBeenCalledWith(item)
      })
    });
  });
});
