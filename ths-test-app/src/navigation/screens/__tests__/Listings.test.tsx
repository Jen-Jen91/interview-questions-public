
import React, { act } from 'react';
import { screen, userEvent, waitFor } from '@testing-library/react-native';

import { renderWithContext } from '@/mocks/context';
import { mockListingsData } from '@/mocks/fixtures';

import ListingsScreen from '../Listings';
import { mockNavigate } from '../../../../jest.setup';

jest.useFakeTimers();

global.fetch = jest.fn().mockResolvedValue(
  {
    ok: true,
    json: () => Promise.resolve(mockListingsData)
  } as Response
);

describe('Listings', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the page when logged in', async () => {
    await waitFor(()=> renderWithContext(<ListingsScreen />, true))
    
    const container = screen.getByTestId("listings-container");
    expect(container).toBeVisible();
  });

   test('renders missing data error when API fetch returns empty', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(
      {
        ok: true,
        json: () => Promise.resolve([]),
      } as Response
    );

    await waitFor(() => renderWithContext(<ListingsScreen />, true));

    const noListingsText = screen.getByText("No listings found");
    expect(noListingsText).toBeVisible();
  });

  test('renders a list of listings data', async () => {
    await waitFor(()=> renderWithContext(<ListingsScreen />, true))
    
    const list = screen.getByTestId("listings-list");
    expect(list).toBeVisible();
    
    const listing1Text = screen.getByText("Listing 1");
    expect(listing1Text).toBeVisible();

    const listing2Text = screen.getByText("Listing 2");
    expect(listing2Text).toBeVisible();

    const listing3Text = screen.getByText("Single listing");
    expect(listing3Text).toBeVisible();
  });

  test('navigates to the SingleListing screen when a listing item is pressed', async () => {
    const user = userEvent.setup();
    await waitFor(()=> renderWithContext(<ListingsScreen />, true));
    
    const listing1Button = screen.getByTestId("listings-row-1");
    await user.press(listing1Button);
    
    act(() => jest.runAllTimers());

    expect(mockNavigate).toHaveBeenCalled();
  });
});