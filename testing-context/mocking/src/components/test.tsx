import { render, screen } from '@testing-library/react'
import { Page } from './Page'
import { useContext } from 'react'

vi.mock('react', () => {
  return {
    ...vi.importActual('react'),
    useContext: vi.fn(),
    createContext: vi.fn()
  }
})

describe('<Page />', () => {
  it('should render light as default theme', () => {
    vi.mocked(useContext).mockReturnValue('light')
    render(<Page />)
    expect(screen.getByText('current theme: light')).toBeInTheDocument()
  })

  it('should render dark theme', () => {
    vi.mocked(useContext).mockReturnValue('dark')
    render(<Page />)
    expect(screen.getByText('current theme: dark')).toBeInTheDocument()
  })
})
