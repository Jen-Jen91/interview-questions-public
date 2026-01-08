import { StaticScreenProps } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Listing, ListingAnimal } from "@/types/listing";
import ImageWithCaption from "@/components/ImageWithCaption";

type Props = StaticScreenProps<{
  listing: Listing
}>;

const AnimalListItem = ({animal, isLast}: {animal: ListingAnimal, isLast: boolean}) => (
  <View style={styles.animalContainer}>
    <Text style={styles.animalText}>
      {`${animal.count} ${animal.name.toLocaleUpperCase()}`}
    </Text>
    {!isLast && (<Text style={styles.animalText}>{' | '}</Text>)}
  </View>
);

export default function SingleListingScreen({route}: Props) {
  const insets = useSafeAreaInsets();
  const { listing } = route.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ImageWithCaption caption={listing.user.firstName} />
      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.locationText}>{listing.location.name}, {listing.location.countryName}</Text>
      <FlatList
        data={listing.animals}
        keyExtractor={(item) => item.name}
        renderItem={({item, index}) => (
          <AnimalListItem animal={item} isLast={index === listing.animals.length - 1}/>
        )}
        style={styles.animalList}
        contentContainerStyle={styles.animalListContent}
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
  animalListContent: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  animalContainer: {
    flexDirection: 'row',
  },
  animalText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
