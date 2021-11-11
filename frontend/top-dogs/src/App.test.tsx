import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('it is waiting for you to start implementation', () => {
  render(<App />);
  const linkElement = screen.getByText(/TopDog/i);
  expect(linkElement).toBeInTheDocument();
});

test.todo('it displays a list of dog breeds with images');
