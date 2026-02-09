import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { BaseScreen } from '../components/BaseScreen';
import { useCnbRates } from '../features/finance/hooks/useCnbRates';
import { useCurrencyConversion } from '../features/finance/hooks/useCurrencyConversion';
import { formatCurrency } from '../utils/formatCurrency';

function ConvertScreen() {
  const [czk, setCzk] = useState('');
  const { data, isLoading, error } = useCnbRates();
  const [currency, setCurrency] = useState('EUR');

  const { result, error: conversionError } = useCurrencyConversion(
    czk,
    currency,
    data?.rates,
  );

  return (
    <BaseScreen error={error} isLoading={isLoading || !data}>
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

      <Picker
        accessibilityLabel="Currency select"
        accessibilityHint="Select the currency to convert to"
        selectedValue={currency}
        onValueChange={setCurrency}
      >
        {data?.rates.map((rate) => (
          <Picker.Item
            key={rate.code}
            value={rate.code}
            label={`${rate.code} — ${rate.currency}`}
          />
        ))}
      </Picker>

      {result !== null && (
        <Text style={styles.result}>{formatCurrency(result, currency)}</Text>
      )}

      {conversionError && <Text style={styles.error}>{conversionError}</Text>}
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  result: {
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});

export { ConvertScreen };
