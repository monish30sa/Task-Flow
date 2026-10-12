import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm';

describe('TaskForm', () => {
  test('shows a validation message when title is empty', async () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole('button', { name: /create task/i }));
    expect(await screen.findByText('Enter a task title.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('submits trimmed title and selected values', async () => {
    const onSubmit = jest.fn().mockResolvedValue({});
    render(<TaskForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText(/task title/i), '  Write tests  ');
    await userEvent.selectOptions(screen.getByLabelText('Priority'), 'High');
    await userEvent.click(screen.getByRole('button', { name: /create task/i }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Write tests',
      priority: 'High'
    })));
  });

  test('shows an API error when save fails', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('API unavailable'));
    render(<TaskForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText(/task title/i), 'A valid task');
    await userEvent.click(screen.getByRole('button', { name: /create task/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('API unavailable');
  });
});
