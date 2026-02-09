import { Picker } from '@react-native-picker/picker';
import type { Rate } from '../types';

interface CurrencySelectProps {
  rates: Rate[];
  value: string;
  onChange: (code: string) => void;
}

function CurrencySelect({ rates, value, onChange }: CurrencySelectProps) {
  return (
    <Picker selectedValue={value} onValueChange={onChange}>
      {rates.map((rate) => (
        <Picker.Item
          key={rate.code}
          value={rate.code}
          label={`${rate.code} — ${rate.currency}`}
        />
      ))}
    </Picker>
  );
}

export { CurrencySelect };
