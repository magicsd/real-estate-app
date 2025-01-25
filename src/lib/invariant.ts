export function invariant(
  condition: boolean,
  message?: string,
): asserts condition
export function invariant<T>(
  condition: T | null | undefined,
  message?: string,
): asserts condition is T
export function invariant(condition: any, message?: string) {
  if (
    condition === false ||
    condition === null ||
    typeof condition === 'undefined'
  ) {
    throw new Error(message)
  }
}
