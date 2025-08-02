import {describe, expect, it} from "@jest/globals";
import {act, render, screen} from "@testing-library/react";
import Home from "@/app/page";

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders timer', () => {
    render(<Home />);
    expect(screen.getByTestId('timer')).toBeInTheDocument();
  });

  it('start at 0', () => {
    render(<Home />);
    expect(screen.getByText('Timer: 0')).toBeInTheDocument();
  });

  it('passed one second', () => {
    render(<Home />);
    act(() => jest.advanceTimersByTime(1_000));
    expect(screen.getByText('Timer: 1')).toBeInTheDocument();
  });
})