import { useState } from "react"

export const useForceUpdate = () => {
  const [, setTemp] = useState(true);
  return () => setTemp(prev => !prev)
}