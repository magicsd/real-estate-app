import React from 'react'
import { invariant } from './invariant'

export interface CreateContextOptions<T> {
  defaultValue?: T
  errorMessage?: string
  hookName?: string
  isStrict?: boolean
  name?: string
  providerName?: string
}
export interface StrictContextOptions<T> extends CreateContextOptions<T> {
  isStrict: true
}
export interface NonStrictContextOptions<T> extends CreateContextOptions<T> {
  isStrict: false
}

function createContext<T>(
  options?: StrictContextOptions<T>,
): [React.Provider<T | undefined>, () => T, React.Context<T | undefined>]
function createContext<T>(
  options?: NonStrictContextOptions<T>,
): [
  React.Provider<T | undefined>,
  () => T | undefined,
  React.Context<T | undefined>,
]
function createContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    defaultValue,
    errorMessage,
    hookName = 'useContext',
    isStrict = true,
    name,
    providerName = 'Provider',
  } = options

  const Context = React.createContext<T | undefined>(defaultValue)

  Context.displayName = name

  const useContext = () => {
    const context = React.useContext(Context)

    invariant(
      (context && isStrict) || !isStrict,
      errorMessage ??
        `You are trying to call ${hookName} outside of ${providerName}.`,
    )

    return context
  }

  return [Context.Provider, useContext, Context] as const
}

export default createContext
