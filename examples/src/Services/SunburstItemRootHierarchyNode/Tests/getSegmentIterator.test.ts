
import { SunburstItem } from "kfinn315_sunburst";
import { getSegmentIterator } from "../getSegmentIterator"

describe('getSegmentIterator', () => {
    it('should return an iterator of the segments in the item name', () => {
        // Arrange
        const item: SunburstItem = {
            name: 'segment1.segment2.segment3',
            color: 0,
            id: 0,
            size: 0
        }

        // Act
        const segmentIterator = getSegmentIterator(item)

        // Assert
        expect([...segmentIterator]).toEqual(['segment1', 'segment2', 'segment3'])
    })

    it('should return an iterator with a single segment if the item name does not contain any dots', () => {
        // Arrange
        const item: SunburstItem = {
            name: 'segment1',
            color: 0,
            id: 0,
            size: 0
        }

        // Act
        const segmentIterator = getSegmentIterator(item)

        // Assert
        expect([...segmentIterator]).toEqual(['segment1'])
    })
})
