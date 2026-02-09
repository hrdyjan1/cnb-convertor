import type { PropsWithChildren } from 'react';
import { type StyleProp, StyleSheet, Text, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BaseScreenProps extends PropsWithChildren {
  isLoading?: boolean;
  loadingText?: string;
  error?: unknown;
  containerStyle?: StyleProp<ViewStyle>;
}

function BaseScreen({
  error,
  children,
  isLoading,
  loadingText = 'Loading...',
  containerStyle,
}: BaseScreenProps) {
  if (isLoading) {
    return <Text>{loadingText}</Text>;
  }

  if (error) {
    return (
      <Text style={styles.redText}>
        {error instanceof Error ? error.message : 'Unknown error'}
      </Text>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.container, containerStyle]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  redText: { color: 'red' },
});

export { BaseScreen };
