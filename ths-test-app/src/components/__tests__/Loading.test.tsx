
import React from 'react';
import { render, screen } from '@testing-library/react-native';

import Loading from '../Loading';

describe('Loading', () => {
  test('renders default text', () => {
    render(<Loading />);
    
    const defaultText = screen.getByText("Loading…");
    expect(defaultText).toBeVisible();
  });

  test('renders props text', () => {
    render(<Loading text='Please wait' />);
    
    const propsText = screen.getByText("Please wait");
    expect(propsText).toBeVisible();
  });
});