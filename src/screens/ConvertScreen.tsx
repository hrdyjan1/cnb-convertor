import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import styled from 'styled-components/native';
import { BaseScreen } from '../components/BaseScreen';
import { LastUpdatedLabel } from '../components/LastUpdatedLabel';
import { useCnbRates } from '../features/finance/hooks/useCnbRates';
import { useCurrencyConversion } from '../features/finance/hooks/useCurrencyConversion';
import { formatCurrency } from '../utils/formatCurrency';

const Content = styled.View`
  flex: 1;
`;

const Section = styled.View`
  margin-bottom: 18px;
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const AmountInput = styled.TextInput`
  flex: 1;
  padding: 14px;
  font-size: 16px;
`;

const CurrencySuffix = styled.View`
  padding: 8px;
`;

const CurrencyText = styled.Text`
  font-weight: 600;
  color: #444;
`;

const PickerWrapper = styled.View`
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const Result = styled.Text`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
`;

const ErrorBox = styled.View`
  background-color: #ffe5e5;
  padding: 12px;
  border-radius: 10px;
  margin-top: 12px;
`;

const ErrorText = styled.Text`
  color: #c00;
  text-align: center;
`;

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
    <BaseScreen error={ratesError} isLoading={isRatesLoading || !ratesData}>
      <Content>
        <Section>
          <InputRow>
            <AmountInput
              value={czk}
              returnKeyType="go"
              onChangeText={setCzk}
              textContentType="none"
              keyboardType="numeric"
              placeholder="Amount in CZK"
              accessibilityLabel="Amount in CZK"
              accessibilityHint="Enter the amount in CZK to convert to the selected currency"
            />
            <CurrencySuffix>
              <CurrencyText>CZK</CurrencyText>
            </CurrencySuffix>
          </InputRow>
        </Section>

        <Section>
          <PickerWrapper>
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
          </PickerWrapper>
        </Section>

        {conversionResult !== null && (
          <Result>{formatCurrency(conversionResult, currency)}</Result>
        )}

        {conversionError && (
          <ErrorBox>
            <ErrorText>{conversionError}</ErrorText>
          </ErrorBox>
        )}
      </Content>

      <LastUpdatedLabel updatedAt={dataUpdatedAt} />
    </BaseScreen>
  );
}

export { ConvertScreen };
