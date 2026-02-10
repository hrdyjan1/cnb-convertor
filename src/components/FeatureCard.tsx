import type { PressableStateCallbackType } from 'react-native';
import styled from 'styled-components/native';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  onPress: () => void;
}

const CardPressable = styled.Pressable`
  background-color: white;
  padding: 18px;
  border-radius: 14px;

  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;

  elevation: 3;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const CardSubtitle = styled.Text`
  margin-top: 4px;
  color: #777;
`;

function FeatureCard({ title, subtitle, onPress }: FeatureCardProps) {
  const style = ({ pressed }: PressableStateCallbackType) => ({
    opacity: pressed ? 0.7 : 1,
    transform: [{ scale: pressed ? 0.98 : 1 }],
  });

  return (
    <CardPressable onPress={onPress} style={style}>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
    </CardPressable>
  );
}

export { FeatureCard };
