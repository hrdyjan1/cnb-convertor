import { StyleSheet, View } from 'react-native';
import { ConversionForm } from './src/features/finance/components/ConversionForm';

function App() {
  return (
    <View style={styles.container}>
      <ConversionForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});

export default App;
