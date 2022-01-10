import { isRef, Ref, shallowRef } from 'vue-demi'

/**
 * A ref with a switch on an array
 *
 * @param array
 * @param initialValue
 */

export function useSwitch<T>(array: Array<T>, initialValue: Ref<T>): (value?: T) => void
export function useSwitch<T>(array: Array<T>, initialValue: T): [Ref<T>, ((value?: T) => void)]

export function useSwitch<T>(array: Array<T>, initialValue: T | Ref<T>) {
  if (isRef(initialValue)) {
    return (value?: T) => {
      initialValue.value = value ?? array[(array.indexOf(initialValue.value) + 1) % array.length]
    }
  }
  else {
    const refSwitch = shallowRef(initialValue)

    const Switch = (value?: T) => {
      refSwitch.value = value ?? array[(array.indexOf(refSwitch.value) + 1) % array.length]
    }

    return [refSwitch, Switch] as const
  }
}
