// tests/components/Plans.test.js
import { render, screen } from '@testing-library/react';
import Plans from '../../components/Plans';

test('renders Plans component', () => {
  render(<Plans />);
  expect(screen.getByText(/Your Plans/i)).toBeInTheDocument();
});