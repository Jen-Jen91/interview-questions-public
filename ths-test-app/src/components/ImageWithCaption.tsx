import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import PlaceholderImage from '@/assets/images/adaptive-icon.png';

interface ImageWithCaptionProps {
  imageSource?: ImageSourcePropType;
  caption?: string;
}

const ImageWithCaption = ({imageSource, caption}: ImageWithCaptionProps) => {
  return (
    <View style={styles.imageContainer}>
      <Image 
        source={imageSource || PlaceholderImage}
        accessibilityLabel="Listing profile photo"
        style={styles.image}
        resizeMode='cover'
      />
      {!!caption && (
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>{caption}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 2,
    paddingHorizontal: 8,
    backgroundColor: 'rgb(242, 242, 242)',
  },
  captionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ImageWithCaption;