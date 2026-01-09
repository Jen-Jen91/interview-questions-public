import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Listing } from "@/types/listing";
import MissingData from "@/components/MissingData";
import Loading from "@/components/Loading";

const ListingRow = ({title, id, onPress}: {title: string, id: number, onPress: () => void}) => (
  <Pressable style={styles.item} onPress={onPress} testID={`listings-row-${id.toString()}`}>
    <Text style={styles.title}>{title}</Text>
  </Pressable>
);

export default function ListingsScreen() {
  const [loading, setLoading] = useState(true);
  const [ listingData, setListingData ] = useState<Listing[]>([]);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
      fetch("/api/listings")
        .then(response => response.json())
        .then(data => setListingData(data))
        .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  };

  if (!loading && !listingData?.length) {
    return <MissingData title="No listings found" subtitle="Sorry, we could not find any listings. Please refesh the page or go back to the Home page." />
  };

  const onPressListing = (listing: Listing) => {
    navigation.navigate(
      'SingleListing',
      { listingId: listing.id }
    );
  };
  
  return (
    <View testID="listings-container" style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={listingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <ListingRow 
            id={item.id}
            title={item.title} 
            onPress={() => onPressListing(item)}
          />
        )}
        style={styles.list}
        testID="listings-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: '100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});
