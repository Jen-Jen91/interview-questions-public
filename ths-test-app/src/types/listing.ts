export type ListingLocation = {
  name: string;
  countryName: string;
  // ...
}

export type ListingUser = {
  id: string;
  firstName: string;
  // ...
}

export type ListingAnimal = {
  name: string;
  slug: string;
  count: number;
}

export type Listing = {
  id: number;
  title: string;
  location: ListingLocation;
  user: ListingUser;
  animals: ListingAnimal[];
  // ...
}