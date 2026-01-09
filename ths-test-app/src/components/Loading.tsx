import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingProps {
  text?: string;
  textColor?: string;
  spinnerColor?: string;
  spinnerSize?: 'small' | 'large';
};

const DEFAULT_LOADING_COLOR = '#999999';

const Loading = ({text, textColor, spinnerColor, spinnerSize}: LoadingProps) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator 
        size={spinnerSize || 'large'}
        color={spinnerColor || DEFAULT_LOADING_COLOR}
      />
      <Text style={{...styles.loadingText, color: textColor || DEFAULT_LOADING_COLOR}}>
        {text || 'Loading…'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
  },
});

export default Loading;