import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskDescription from './TaskDescription';

describe('TaskDescription', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const route = {
    params: {
      reportName: 'Test Report',
      item: {
        taskDescription: 'Test Task Description',
      },
    },
  };

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <TaskDescription navigation={navigation} route={route} />
    );

    expect(getByText('Test Report')).toBeTruthy();
    expect(getByText('Test Task Description')).toBeTruthy();
    expect(getByPlaceholderText('Enter Description')).toBeTruthy();
    expect(getByText('Add Description')).toBeTruthy();
  });

  it('submits description when button is pressed', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );
    const { getByPlaceholderText, getByText } = render(
      <TaskDescription navigation={navigation} route={route} />
    );
    const input = getByPlaceholderText('Enter Description');
    fireEvent.changeText(input, 'Test Description');
    fireEvent.press(getByText('Add Description'));

    await new Promise((r) => setTimeout(r, 0));

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch.mock.calls[0][0]).toBe(
      'http://localhost:3001/api/descriptions'
    );
    expect(global.fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(global.fetch.mock.calls[0][1].body)).toEqual({
      description: 'Test Description',
      user_id: undefined,
    });
  });

  it('does not submit description if it is empty', async () => {
    global.fetch = jest.fn(() => Promise.resolve());
    const { getByText } = render(
      <TaskDescription navigation={navigation} route={route} />
    );
    fireEvent.press(getByText('Add Description'));

    await new Promise((r) => setTimeout(r, 0));

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
