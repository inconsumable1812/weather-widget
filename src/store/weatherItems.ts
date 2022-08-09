import { WeatherItems, State, Item } from 'vue';
import { Module } from 'vuex';
import { sortOrder } from '@/utils';

const weatherItems: Module<State, WeatherItems> = {
  state: {
    items: [],
    currentItem: null
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getCurrentItem(state) {
      return state.currentItem;
    }
  },
  mutations: {
    addItem(
      state,
      { newName, country_code }: { newName: string; country_code: string }
    ) {
      const order =
        state.items.length === 0
          ? 1
          : state.items[state.items.length - 1].order + 1;

      const newItem: Item = {
        cityName: newName,
        id: new Date().getTime(),
        order,
        country_code
      };

      state.items.push(newItem);
    },
    addItemFromStorage(state, item: Item) {
      state.items.push(item);
    },
    deleteItem(state, id: number) {
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index, 1);
    },
    changeCurrentItem(state, value: Item | null) {
      state.currentItem = value;
    },
    changeOrder(state, dropItem: Item) {
      const currentItem = state.currentItem;
      if (currentItem === null) {
        return;
      }

      const dropStartItem = state.items.find(
        (item) => item.id === currentItem.id
      );
      if (dropStartItem === undefined) return;

      const dropEndItem = state.items.find((item) => item.id === dropItem.id);
      if (dropEndItem === undefined) return;

      const startOrderNumber = dropStartItem.order;
      const endOrderNumber = dropEndItem.order;
      dropStartItem.order = endOrderNumber;
      dropEndItem.order = startOrderNumber;

      localStorage.removeItem(dropStartItem.cityName);
      localStorage.setItem(
        dropStartItem.cityName,
        JSON.stringify(dropStartItem)
      );

      localStorage.removeItem(dropEndItem.cityName);
      localStorage.setItem(dropEndItem.cityName, JSON.stringify(dropEndItem));
    },
    sortItems(state) {
      state.items.sort(sortOrder);
    }
  },
  actions: {}
};

export default weatherItems;
