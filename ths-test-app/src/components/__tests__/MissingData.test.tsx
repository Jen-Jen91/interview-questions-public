
import React from 'react';
import { render, screen } from '@testing-library/react-native';

import MissingData from '../MissingData';

describe('MissingData', () => {
  test('renders correctly', () => {
    render(<MissingData title='Oops' subtitle='Data not found' />);
    
    const title = screen.getByText("Oops");
    expect(title).toBeVisible();

    const subtitle = screen.getByText("Data not found");
    expect(subtitle).toBeVisible();
  });
});