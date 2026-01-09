import { Listing } from "@/types/listing";

export const mockSingleListingData: Listing = {
  id: 3,
  title: "Single listing",
  location: {
    name: "Brighton",
    countryName: "United Kingdom",
  },
  user: {
    id: "333",
    firstName: "Test Test",
  },
  animals: [
    {
      name: "dog",
      slug: "dogs",
      count: 2,
    },
    {
      name: "cat",
      slug: "cats",
      count: 1,
    },
    {
      name: "bird",
      slug: "birds",
      count: 2,
    },
  ],
};

export const mockListingsData: Listing[] = [
  {
    id: 1,
    title: "Listing 1",
    location: {
      name: "London",
      countryName: "United Kingdom",
    },
    user: {
      id: "111",
      firstName: "Test 1",
    },
    animals: [
      {
        name: "dog",
        slug: "dogs",
        count: 1,
      }
    ]
  },
  {
    id: 2,
    title: "Listing 2",
    location: {
      name: "Edinburgh",
      countryName: "United Kingdom",
    },
    user: {
      id: "222",
      firstName: "Test 2",
    },
    animals: [
      {
        name: "cat",
        slug: "cats",
        count: 2,
      }
    ]
  },
  mockSingleListingData,
];