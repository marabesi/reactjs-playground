import { render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'

describe('<App />', () => {
  it('should render toggle button', () => {
    render(<App />)
    expect(screen.getByText('Toggle')).toBeInTheDocument()
  })

  it('should render light as default theme', () => {
    render(<App />)
    expect(screen.getByText('current theme: light')).toBeInTheDocument()
  })

  it('should render dark theme', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('Toggle'))

    expect(screen.getByText('current theme: dark')).toBeInTheDocument()
  })
})
