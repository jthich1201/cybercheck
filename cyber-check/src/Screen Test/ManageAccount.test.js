import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ManageAccount from './ManageAccount';

describe('ManageAccount component', () => {
  test('renders correctly', () => {
    const { getByText, getByTestId } = render(<ManageAccount />);
    
    expect(getByTestId('manage-account-screen')).toBeDefined();
    expect(getByText('Profile')).toBeDefined();
    expect(getByText('Name:')).toBeDefined();
    expect(getByText('Email:')).toBeDefined();
    expect(getByTestId('manage-org-button')).toBeDefined();
  });

  test('navigates to ManageOrganization screen when Manage Organization button is pressed', () => {
    const navigationMock = { navigate: jest.fn() };
    const { getByTestId } = render(<ManageAccount navigation={navigationMock} />);

    fireEvent.press(getByTestId('manage-org-button'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('ManageOrganization', {});
  });
});