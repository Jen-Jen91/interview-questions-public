
import React from 'react';
import { render, screen } from '@testing-library/react-native';

import ImageWithCaption from '../ImageWithCaption';

describe('ImageWithCaption', () => {
  test('renders correctly', () => {
    render(<ImageWithCaption caption="Test caption" testId="image-test-id" />);
    
    const container = screen.getByTestId("image-test-id");
    expect(container).toBeVisible();

    const caption = screen.getByText("Test caption");
    expect(caption).toBeVisible();
  });
});