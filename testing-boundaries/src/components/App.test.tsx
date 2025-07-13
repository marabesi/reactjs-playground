import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('should render toggle button', () => {
    render(<App />)
    expect(screen.getByText('Toggle')).toBeInTheDocument()
  })
})
