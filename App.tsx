import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { QueryProvider } from './src/app/providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </SafeAreaProvider>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default App;
