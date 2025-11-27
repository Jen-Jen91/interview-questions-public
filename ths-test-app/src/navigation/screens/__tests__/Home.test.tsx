
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../Home';
import { LoggedInContext } from '../../../App';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const renderWithContext = (component, isLoggedIn = false, toggleIsLoggedIn = jest.fn()) => {
  return render(
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
        {component}
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};

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

test('calls toggleIsLoggedIn when button is pressed', () => {
  const toggleIsLoggedIn = jest.fn();
  renderWithContext(<HomeScreen />, false, toggleIsLoggedIn);
  
  const loginButton = screen.getByText('Log In');
  fireEvent.press(loginButton);
  
  expect(toggleIsLoggedIn).toHaveBeenCalled();
});
