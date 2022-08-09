import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  type Item = {
    cityName: string;
    id: number;
    order: number;
    country_code: string;
  };

  type WeatherItemsState = {
    items: Item[];
    currentItem: null | Item;
  };

  type Language = 'en' | 'ru';

  type LanguageState = {
    language: Language;
  };

  type State = WeatherItemsState & LanguageState;

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
