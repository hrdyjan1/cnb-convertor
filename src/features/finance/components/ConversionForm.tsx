import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useCnbRates } from '../hooks/useCnbRates';
import { useCurrencyConversion } from '../hooks/useCurrencyConversion';
import { CurrencySelect } from './CurrencySelect';

function ConversionForm() {
  const [czk, setCzk] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const { data, isLoading, error: ratesError } = useCnbRates();

  const { result, error: conversionError } = useCurrencyConversion(
    czk,
    currency,
    data?.rates,
  );

  if (isLoading || !data) {
    return <Text>Loading rates...</Text>;
  }

  if (ratesError) {
    return (
      <Text style={styles.error}>
        {ratesError instanceof Error ? ratesError.message : 'Unknown error'}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={czk}
        returnKeyType="go"
        style={styles.input}
        onChangeText={setCzk}
        textContentType="none"
        keyboardType="numeric"
        placeholder="Amount in CZK"
        accessibilityLabel="Amount in CZK"
        accessibilityHint="Enter the amount in CZK to convert to the selected currency"
      />

      <CurrencySelect
        rates={data.rates}
        value={currency}
        onChange={setCurrency}
      />

      {result !== null && (
        <Text style={styles.result}>{formatCurrency(result, currency)}</Text>
      )}

      {conversionError && <Text style={styles.error}>{conversionError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  result: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
});

export { ConversionForm };
