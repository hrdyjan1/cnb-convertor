import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { BaseScreen } from '../components/BaseScreen';

function HomeScreen() {
  const navigation = useNavigation();

  const handleConverterPress = () => {
    navigation.navigate('Converter');
  };

  const handleRatesPress = () => {
    navigation.navigate('Rates');
  };

  return (
    <BaseScreen>
      <Button title="Currency Converter" onPress={handleConverterPress} />
      <Button title="View Rates" onPress={handleRatesPress} />
    </BaseScreen>
  );
}

export { HomeScreen };
