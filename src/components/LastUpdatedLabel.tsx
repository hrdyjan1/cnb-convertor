import { StyleSheet, Text } from 'react-native';
import { getLastUpdatedLabel } from '../utils/getLastUpdatedLabel';

interface LastUpdatedLabelProps {
  updatedAt: number;
}

function LastUpdatedLabel({ updatedAt }: LastUpdatedLabelProps) {
  const lastUpdatedLabel = getLastUpdatedLabel(updatedAt);
  return <Text style={styles.lastUpdated}>{lastUpdatedLabel}</Text>;
}

const styles = StyleSheet.create({
  lastUpdated: {
    textAlign: 'center',
  },
});

export { LastUpdatedLabel };
