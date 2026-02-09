import type { RootStackParamList } from './src/app/navigation/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
