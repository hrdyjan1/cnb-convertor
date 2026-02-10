import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { BaseScreen } from '../components/BaseScreen';
import { FeatureCard } from '../components/FeatureCard';
import { LastUpdatedLabel } from '../components/LastUpdatedLabel';
import { useCnbRates } from '../features/finance/hooks/useCnbRates';

const Content = styled.View`
  flex: 1;
`;

const Header = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
`;

const Subheader = styled.Text`
  font-size: 15px;
  color: #666;
  margin-bottom: 24px;
`;

const Cards = styled.View`
  gap: 16px;
`;

function HomeScreen() {
  const navigation = useNavigation();
  const { dataUpdatedAt } = useCnbRates();

  return (
    <BaseScreen>
      <Content>
        <Header>Currency Tools</Header>
        <Subheader>Convert CZK and browse exchange rates</Subheader>

        <Cards>
          <FeatureCard
            title="Currency Converter"
            subtitle="Quick CZK conversion"
            onPress={() => navigation.navigate('Converter')}
          />

          <FeatureCard
            title="View Rates"
            subtitle="Browse all currencies"
            onPress={() => navigation.navigate('Rates')}
          />
        </Cards>
      </Content>

      <LastUpdatedLabel updatedAt={dataUpdatedAt} />
    </BaseScreen>
  );
}

export { HomeScreen };
