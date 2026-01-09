import { useEffect, useState } from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Listing, ListingAnimal } from "@/types/listing";
import ImageWithCaption from "@/components/ImageWithCaption";
import MissingData from "@/components/MissingData";

type Props = StaticScreenProps<{
  listingId: number
}>;

const AnimalListItem = ({animal, isLast}: {animal: ListingAnimal, isLast: boolean}) => (
  <>
    <Text style={styles.animalText}>
      {`${animal.count} ${animal.name.toLocaleUpperCase()}`}
    </Text>
    {!isLast && (<Text style={styles.animalText}>{' | '}</Text>)}
  </>
);

export default function SingleListingScreen({route}: Props) {
  const [ singleListingData, setSingleListingData ] = useState<Listing>();

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { listingId } = route.params;

  // Fetch data for a single listing using id in route params.
  // Whole listing object could be passed as params within app, but wouldn't work for deep links.
  useEffect(() => {
      fetch("/api/listings")
        .then(response => response.json())
        .then(data => data?.find((item: Listing) => item.id === listingId))
        .then(item => setSingleListingData(item));
  }, [listingId]);

  // Update screen title with listing title (if available).
  // Can cause flickering on initial render - might prefer a common title.
  useEffect(() => {
    if (!singleListingData?.title) return;
    navigation.setOptions({ title: singleListingData?.title });
  }, [navigation, singleListingData]);

  if (!singleListingData) {
    return <MissingData title="Listing not found" subtitle="Sorry, we could not find that listing. Please refresh the page or go back to the Listings page." />;
  }

  const getLocationText = () => {
    const locationData = singleListingData.location;
    const locationParts = [locationData.name, locationData.countryName];
    const locationText = locationParts.filter(Boolean).join(', ');
    return locationText || 'Unknown Location';
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} testID="single-listing-container">
      <ImageWithCaption 
        caption={singleListingData.user.firstName}
        altLabel="Listing profile photo"
        testId="single-listing-image"
      />
      <Text style={styles.title}>{singleListingData.title || 'THS Listing'}</Text>
      <Text style={styles.locationText}>{getLocationText()}</Text>
      <FlatList
        data={singleListingData.animals}
        keyExtractor={(item) => item.name}
        renderItem={({item, index}) => (
          <AnimalListItem animal={item} isLast={index === singleListingData.animals.length - 1}/>
        )}
        style={styles.animalList}
        numColumns={5}
        testID="single-listing-animal-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  locationText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: 'gray'
  },
  animalList: {
    width: '100%',
    marginTop: 16,
  },
  animalText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
