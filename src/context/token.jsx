import { createContext, useContext } from 'react'

export const Context = createContext()

export function useToken() {
  return useContext(Context)
}
