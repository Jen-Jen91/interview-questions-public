import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Listing } from "@/types/listing";

const ListingRow = ({title, onPress}: {title: string, onPress: () => void}) => (
  <Pressable style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
  </Pressable>
);

export default function ListingsScreen() {
  const [ listingData, setListingData ] = useState<Listing[]>([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
      fetch("/api/listings").then(response => response.json()).then(data => setListingData(data));
  }, []);

  const onPressListing = (listing: Listing) => {
    navigation.navigate(
      'SingleListing',
      { listing }
    );
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={listingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <ListingRow 
            title={item.title} 
            onPress={() => onPressListing(item)}
          />
        )}
        style={styles.list}
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
