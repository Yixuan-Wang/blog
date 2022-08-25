import { zipObject } from "lodash-es";

export function mapTo<T extends string | number | symbol, U>(array: T[], to: U): Record<T, U> {
  return zipObject(array, Array(array.length).fill(to)) as Record<T, U>;
}

export function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}
