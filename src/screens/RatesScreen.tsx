import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { BaseScreen } from '../components/BaseScreen';
import { LastUpdatedLabel } from '../components/LastUpdatedLabel';
import { useCnbRates } from '../features/finance/hooks/useCnbRates';

const Content = styled.View`
  flex: 1;
`;

const ItemCard = styled.View`
  flex-direction: row;
  padding: 14px;
  border-radius: 12px;
  background-color: #fff;
  margin-bottom: 10px;

  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;

  elevation: 1;
`;

const Code = styled.Text`
  flex: 1.2;
  font-size: 12px;
  font-weight: 700;
`;

const Country = styled.Text`
  flex: 1;
  font-size: 12px;
  text-align: center;
  color: #666;
`;

const Amount = styled.Text`
  flex: 1.8;
  font-size: 12px;
  text-align: right;
  font-weight: 600;
`;

function RatesScreen() {
  const { data, error, isFetching, isLoading, dataUpdatedAt, refetch } =
    useCnbRates();

  return (
    <BaseScreen error={error} isLoading={isLoading}>
      <Content>
        <FlatList
          data={data?.rates ?? []}
          keyExtractor={(item) => item.code}
          onRefresh={refetch}
          refreshing={isFetching}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ItemCard>
              <Code numberOfLines={1}>
                {item.code} ({item.currency})
              </Code>

              <Country numberOfLines={1}>{item.country}</Country>

              <Amount numberOfLines={1}>
                {item.amount} ~ {item.rate.toFixed(2)} CZK
              </Amount>
            </ItemCard>
          )}
        />
      </Content>

      <LastUpdatedLabel updatedAt={dataUpdatedAt} />
    </BaseScreen>
  );
}

export { RatesScreen };
