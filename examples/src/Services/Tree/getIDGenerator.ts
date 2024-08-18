import { IDGenerator } from "./Types"

export function getIDGenerator(): IDGenerator {

  const idGenerator = generator()

  return {
    next() {
      const nextResult = idGenerator.next()
      if (nextResult.done)
        throw new Error("idGenerator did not return an ID")
      return nextResult.value
    }
  }

  function* generator(): Generator<number, void> {
    let index = 0
    while (true) {
      yield index++
    }
  }
}
