import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { BaseScreen } from '../components/BaseScreen';
import { LastUpdatedLabel } from '../components/LastUpdatedLabel';
import { useCnbRates } from '../features/finance/hooks/useCnbRates';
import { useCurrencyConversion } from '../features/finance/hooks/useCurrencyConversion';
import { formatCurrency } from '../utils/formatCurrency';

function ConvertScreen() {
  const [czk, setCzk] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const {
    data: ratesData,
    dataUpdatedAt,
    error: ratesError,
    isLoading: isRatesLoading,
  } = useCnbRates();

  const { result: conversionResult, error: conversionError } =
    useCurrencyConversion(czk, currency, ratesData?.rates ?? []);

  return (
    <BaseScreen
      error={ratesError}
      isLoading={isRatesLoading || !ratesData}
      containerStyle={styles.container}
    >
      <View>
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
          {ratesData?.rates.map((rate) => (
            <Picker.Item
              key={rate.code}
              value={rate.code}
              label={`${rate.code} — ${rate.currency}`}
            />
          ))}
        </Picker>

        {conversionResult !== null && (
          <Text style={styles.result}>
            {formatCurrency(conversionResult, currency)}
          </Text>
        )}

        {conversionError && <Text style={styles.error}>{conversionError}</Text>}
      </View>

      <LastUpdatedLabel updatedAt={dataUpdatedAt} />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
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
    textAlign: 'center',
    color: 'red',
  },
});

export { ConvertScreen };
