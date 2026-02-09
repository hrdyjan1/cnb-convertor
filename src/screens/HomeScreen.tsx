import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, View } from 'react-native';
import { BaseScreen } from '../components/BaseScreen';
import { LastUpdatedLabel } from '../components/LastUpdatedLabel';
import { useCnbRates } from '../features/finance/hooks/useCnbRates';

function HomeScreen() {
  const navigation = useNavigation();
  const { dataUpdatedAt } = useCnbRates();

  const handleConverterPress = () => {
    navigation.navigate('Converter');
  };

  const handleRatesPress = () => {
    navigation.navigate('Rates');
  };

  return (
    <BaseScreen containerStyle={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Currency Converter" onPress={handleConverterPress} />
        <Button title="View Rates" onPress={handleRatesPress} />
      </View>

      <LastUpdatedLabel updatedAt={dataUpdatedAt} />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    gap: 16,
  },
});

export { HomeScreen };
