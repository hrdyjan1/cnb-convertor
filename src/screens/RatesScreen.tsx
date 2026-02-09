import { FlatList, StyleSheet, Text, View } from 'react-native';
import { BaseScreen } from '../components/BaseScreen';
import { useCnbRates } from '../features/finance/hooks/useCnbRates';
import type { Rate } from '../features/finance/types';

function RatesScreen() {
  const { data, isLoading, error } = useCnbRates();

  const renderItem = ({ item }: { item: Rate }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.code}>
          {item.code} ({item.currency})
        </Text>

        <Text style={styles.country}>{item.country}</Text>

        <Text style={styles.amount}>
          {item.amount} ~ {item.rate.toFixed(2)} CZK
        </Text>
      </View>
    );
  };

  return (
    <BaseScreen error={error} isLoading={isLoading}>
      <FlatList
        refreshing={isLoading}
        renderItem={renderItem}
        data={data?.rates ?? []}
        showsVerticalScrollIndicator={false}
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  code: { flex: 1 },
  country: { flex: 1, textAlign: 'center' },
  amount: { flex: 1, textAlign: 'right' },
  item: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export { RatesScreen };
