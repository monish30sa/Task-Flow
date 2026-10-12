import { render, screen } from '@testing-library/react';
import TaskStatus from './TaskStatus';

test('renders the task status label', () => {
  render(<TaskStatus status="In Progress" />);
  expect(screen.getByText('In Progress')).toBeInTheDocument();
});
