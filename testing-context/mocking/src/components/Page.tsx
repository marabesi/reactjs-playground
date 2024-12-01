import { useContext } from 'react'

import { ThemeContext } from './ThemeContext'

export function Page() {
  const theme = useContext(ThemeContext)
  return (
    <div>
      <p>current theme: {theme}</p>
    </div>
  )
}
