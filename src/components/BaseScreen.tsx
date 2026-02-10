import type { PropsWithChildren } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

interface BaseScreenProps extends PropsWithChildren {
  isLoading?: boolean;
  loadingText?: string;
  error?: Error | null;
}

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  margin-top: 12px;
  font-size: 14px;
  color: #666;
`;

const ErrorText = styled.Text`
  color: #d00;
  font-size: 15px;
  text-align: center;
`;

function BaseScreen({
  error,
  children,
  isLoading,
  loadingText = 'Loading...',
}: BaseScreenProps) {
  return (
    <Container edges={['bottom']}>
      {isLoading ? (
        <Centered>
          <ActivityIndicator size="large" />
          <LoadingText>{loadingText}</LoadingText>
        </Centered>
      ) : error ? (
        <Centered>
          <ErrorText>
            {error instanceof Error ? error.message : 'Unknown error'}
          </ErrorText>
        </Centered>
      ) : (
        children
      )}
    </Container>
  );
}

export { BaseScreen };
