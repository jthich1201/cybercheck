import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskComment from '../TaskComment';

jest.mock('axios');

describe('TaskComment component', () => {
  const route = { params: { reportName: 'Report 1', item: { task_id: 123, title: 'Task 1' } } };
  const props = { navigation: { navigate: jest.fn() }, route };
  
  test('renders TaskComment component', () => {
    const { getByText } = render(<TaskComment {...props} />);
    expect(getByText('Report 1')).not.toBeNull();
    expect(getByText('Task 1')).not.toBeNull();
  });

  test('clicking on back button navigates to ReportTasks screen', () => {
    const { getByText } = render(<TaskComment {...props} />);
    const backButton = getByText('arrow-back-ios');
    fireEvent.press(backButton);
    expect(props.navigation.navigate).toHaveBeenCalledWith('ReportTasks', { reportName: 'Report 1' });
  });

  test('clicking on submit button calls submitComment function', () => {
    const { getByText } = render(<TaskComment {...props} />);
    const addButton = getByText('Add Comments');
    fireEvent.press(addButton);
    expect(submitComment).toHaveBeenCalled();
  });

  test('typing in comment text field updates the state', () => {
    const { getByPlaceholderText } = render(<TaskComment {...props} />);
    const commentInput = getByPlaceholderText('comments...');
    fireEvent.changeText(commentInput, 'Sample comment');
    expect(commentInput.props.value).toEqual('Sample comment');
  });
});