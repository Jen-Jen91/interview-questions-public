import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoggedInContext } from '@/App';

export const renderWithContext = (component: React.ReactNode, isLoggedIn = false, toggleIsLoggedIn = jest.fn()) => {
  return render(
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
        {component}
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};