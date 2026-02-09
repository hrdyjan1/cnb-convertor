import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConvertScreen } from '../../screens/ConvertScreen';
import { HomeScreen } from '../../screens/HomeScreen';
import { RatesScreen } from '../../screens/RatesScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Converter" component={ConvertScreen} />
        <Stack.Screen name="Rates" component={RatesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { RootNavigator };
