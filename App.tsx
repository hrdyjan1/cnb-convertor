import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useCnbRates } from './src/features/finance/hooks/useCnbRates';

function App() {
  const { data, error, isLoading } = useCnbRates();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {String(error)}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data?.rates}
        renderItem={(rate) => (
          <View style={styles.item}>
            <Text>{rate.item.code}</Text>
            <Text>{rate.item.currency}</Text>
            <Text>{rate.item.country}</Text>
            <Text>{rate.item.amount}</Text>
            <Text>{rate.item.rate}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
