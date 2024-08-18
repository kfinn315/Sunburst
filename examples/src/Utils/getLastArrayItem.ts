export default function getLastArrayItem<T = string>(array: T[]): T {
  return array[array.length - 1]
}
