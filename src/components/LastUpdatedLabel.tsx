import styled from 'styled-components/native';
import { getLastUpdatedLabel } from '../utils/getLastUpdatedLabel';

const Container = styled.View`
  align-self: center;
  background-color: #f1f3f5;
  padding: 6px 12px;
  border-radius: 999px;
`;

const TextLabel = styled.Text`
  font-size: 12px;
  color: #555;
`;

const Spacer = styled.View`
  height: 10px;
`;

interface LastUpdatedLabelProps {
  updatedAt: number;
}

function LastUpdatedLabel({ updatedAt }: LastUpdatedLabelProps) {
  const label = getLastUpdatedLabel(updatedAt);
  return (
    <>
      <Spacer />
      <Container>
        <TextLabel>{label}</TextLabel>
      </Container>
    </>
  );
}

export { LastUpdatedLabel };
