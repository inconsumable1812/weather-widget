import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  type Item = {
    cityName: string;
    id: number;
    order: number;
  };

  type WeatherItems = {
    items: Item[];
    currentCard: null | Item;
  };

  type State = WeatherItems;

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
