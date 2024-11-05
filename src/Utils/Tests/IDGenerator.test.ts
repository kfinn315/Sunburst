import { IDGenerator, BasicIDGenerator } from "../IDGenerator"


describe('getIDGenerator', () => {
    let idGenerator: IDGenerator

    beforeEach(() => {
        idGenerator = new BasicIDGenerator()
    })

    describe('next', () => {
        it('should generate the next unique id when called', () => {
            const id1 = idGenerator.next()
            const id2 = idGenerator.next()

            expect(id1).toBeDefined()
            expect(id2).toBeDefined()
            expect(id1).not.toEqual(id2)
        })

        // it('should throw an error if idGenerator does not return an ID', () => {
        //     const emptyGenerator = {
        //         next: () => ({ done: true, value: undefined }),
        //     }

        //     expect(() => {
        //         const idGenerator2 = { ...idGenerator, ...emptyGenerator }
        //         idGenerator2.next()
        //     }).toThrow('idGenerator did not return an ID')
        // })
    })
})
