import { useState } from 'react'
import { Page } from './Page'
import { ThemeContext } from './ThemeContext'

function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>
      <button
        className={theme}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Toggle
      </button>
      <Page />
    </ThemeContext.Provider>
  )
}

export default App
