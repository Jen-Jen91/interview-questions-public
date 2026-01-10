
import React from 'react';
import { screen, waitFor } from '@testing-library/react-native';

import { renderWithContext } from '@/mocks/context';
import { mockListingsData, mockSingleListingData } from '@/mocks/fixtures';

import SingleListingScreen from '../SingleListing';

jest.useFakeTimers();

global.fetch = jest.fn().mockResolvedValue(
  {
    ok: true,
    json: () => Promise.resolve(mockListingsData)
  } as Response
);

describe('SingleListing', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const routeWithParams = { params: { listingId: mockSingleListingData.id } };

  test('renders the page when logged in', async () => {
    await waitFor(() => renderWithContext(<SingleListingScreen route={routeWithParams} />, true));
    
    const container = screen.getByTestId("single-listing-container");
    expect(container).toBeVisible();
  });

  test('renders missing data error when API fetch returns empty', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(
      {
        ok: true,
        json: () => Promise.resolve([]),
      } as Response
    );

    await waitFor(() => renderWithContext(<SingleListingScreen route={routeWithParams} />, true));

    const noListingsText = screen.getByText("Listing not found");
    expect(noListingsText).toBeVisible();
  });

  test('renders data for relevant single listing', async () => {
    await waitFor(() => renderWithContext(<SingleListingScreen route={routeWithParams} />, true));
    
    const image = screen.getByTestId("single-listing-image");
    expect(image).toBeVisible();
    
    const title = screen.getByText(mockSingleListingData.title);
    expect(title).toBeVisible();

    const user = screen.getByText(mockSingleListingData.user.firstName);
    expect(user).toBeVisible();

    const location = screen.getByText(`${mockSingleListingData.location.name}, ${mockSingleListingData.location.countryName}`);
    expect(location).toBeVisible();

    const animalsList = screen.getByTestId("single-listing-animal-list");
    expect(animalsList).toBeVisible();

    const dogText = screen.getByText("2 DOG");
    expect(dogText).toBeVisible();

    const catText = screen.getByText("1 CAT");
    expect(catText).toBeVisible();

    const birdText = screen.getByText("2 BIRD");
    expect(birdText).toBeVisible();

    const pipeText = screen.getAllByText(" | ");
    expect(pipeText).toHaveLength(2);
  });
});