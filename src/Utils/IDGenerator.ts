
export interface IDGenerator {
  next(): number;
}

export class BasicIDGenerator implements IDGenerator {
  private idGenerator: Generator<number, void>

  constructor(start: number = 0) {
    function* generator(): Generator<number, void> {
      let index = start
      while (true) {
        yield index++
      }
    }
    this.idGenerator = generator()
  }

  next(): number {
    const nextResult = this.idGenerator.next()
    if (nextResult.done)
      throw new Error("idGenerator did not return an ID")
    return nextResult.value
  }

}
