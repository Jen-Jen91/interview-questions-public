import React from 'react';
import { screen, userEvent } from '@testing-library/react-native';
import { renderWithContext } from '@/mocks/context';
import HomeScreen from '../Home';

test('renders login button when not logged in', () => {
  renderWithContext(<HomeScreen />, false);
  
  const loginButton = screen.getByText('Log In');
  expect(loginButton).toBeTruthy();
});

test('renders logout button when logged in', () => {
  renderWithContext(<HomeScreen />, true);
  
  const logoutButton = screen.getByText('Log Out');
  expect(logoutButton).toBeTruthy();
});

test('calls toggleIsLoggedIn when button is pressed', async () => {
  const toggleIsLoggedIn = jest.fn();
  const user = userEvent.setup();
  renderWithContext(<HomeScreen />, false, toggleIsLoggedIn);
  
  const loginButton = screen.getByText('Log In');
  await user.press(loginButton);
  
  expect(toggleIsLoggedIn).toHaveBeenCalled();
});
