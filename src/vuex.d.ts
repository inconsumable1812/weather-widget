import { Store } from 'vuex';
import { WeatherCity } from '@/api/types';

declare module '@vue/runtime-core' {
  type Language = 'en' | 'ru';

  type Item = {
    value: WeatherCity;
    id: number;
    order: number;
  };

  type WeatherItemsState = {
    items: Item[];
    currentItem: null | Item;
    language: Language;
    error: Error | null;
    isLoading: boolean;
  };

  type State = WeatherItemsState;

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
