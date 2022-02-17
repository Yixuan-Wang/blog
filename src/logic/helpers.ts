import { zipObject } from 'lodash-es'

export function mapTo<T extends string | number | symbol, U>(array: T[], to: U): Record<T, U> {
  return zipObject(array, Array(array.length).fill(to)) as Record<T, U>
}
