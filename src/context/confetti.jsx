import { createContext, useContext } from 'react'

export const ConfettiContext = createContext()

export function useConfetti() {
  return useContext(ConfettiContext)
}
