import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import Item from './components/item'
import List from './components/list'

// Mock fetch globally
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe('App Component', () => {
  it('fetches data on mount and renders it', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ name: "Ontario", capital: "Toronto", flagUrl: "some-url" }]),
      })
    );

    const { getByText } = render(<App />);
    expect(fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(getByText('Ontario')).toBeInTheDocument());
  });

  it('changes the data type on menu item click', async () => {
    fetch.mockImplementation((url) =>
      Promise.resolve({
        json: () => Promise.resolve(url.includes('provinces') ? [{ name: "Ontario" }] : [{ name: "Nunavut" }]),
      })
    );

    const { getByText, rerender } = render(<App />);
    fireEvent.click(getByText('Territories'));
    await waitFor(() => expect(getByText('Nunavut')).toBeInTheDocument());

    rerender(<App />);
    fireEvent.click(getByText('Provinces'));
    await waitFor(() => expect(getByText('Ontario')).toBeInTheDocument());
  });
});

describe('Item Component', () => {
  it('toggles the capital on button click', () => {
    const { getByText, queryByText } = render(<Item name="Ontario" capital="Toronto" flagUrl="some-url" />);
    expect(queryByText('Toronto')).toBeNull();
    fireEvent.click(getByText('Show Capital'));
    expect(getByText('Toronto')).toBeInTheDocument();
    fireEvent.click(getByText('Hide Capital'));
    expect(queryByText('Toronto')).toBeNull();
  });

  it('displays the flag image correctly', () => {
    const flagUrl = "http://example.com/flag.jpg";
    const { getByAltText } = render(<Item name="Ontario" capital="Toronto" flagUrl={flagUrl} />);
    const img = getByAltText("Ontario's Flag");
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(flagUrl);
  });
});

describe('List Component', () => {
  const provinces = [
    { name: "Ontario", capital: "Toronto", flagUrl: "some-url" },
    { name: "Quebec", capital: "Quebec City", flagUrl: "some-url" }
  ];

  it('renders multiple item components', () => {
    const { getByText } = render(<List data={provinces} />);
    expect(getByText('Ontario')).toBeInTheDocument();
    expect(getByText('Quebec')).toBeInTheDocument();
  });
});