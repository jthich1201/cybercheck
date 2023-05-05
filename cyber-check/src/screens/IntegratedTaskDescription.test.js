import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskDescription from './TaskDescription';

describe('TaskDescription', () => {
  it('should render the component', () => {
    const { getByText, getByPlaceholderText } = render(<TaskDescription />);
    const descriptionPlaceholder = getByPlaceholderText('Enter Description');
    const addDescriptionButton = getByText('Add Description');
    expect(descriptionPlaceholder).toBeTruthy();
    expect(addDescriptionButton).toBeTruthy();
  });

  it('should add a description and complete the task', async () => {
    const { getByText, getByPlaceholderText } = render(<TaskDescription />);
    const descriptionPlaceholder = getByPlaceholderText('Enter Description');
    const addDescriptionButton = getByText('Add Description');

    fireEvent.changeText(descriptionPlaceholder, 'This is a test description');
    fireEvent.press(addDescriptionButton);

    // Wait for API calls to complete
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(2));

    // Expect the navigation to the ReportTasks screen to have been called with the correct props
    expect(navigation.navigate).toHaveBeenCalledWith('ReportTasks', {
      reportName: 'Test Report',
      completedTaskBool: true,
    });
  });
});
