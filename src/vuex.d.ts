import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  type Item = {
    cityName: string;
    id: number;
    order: number;
    country_code: string;
  };

  type WeatherItems = {
    items: Item[];
    currentItem: null | Item;
  };

  type State = WeatherItems;

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
