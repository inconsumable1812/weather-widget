import { WeatherItemsState, Item, State, Language } from 'vue';
import { Module } from 'vuex';
import { sortOrder } from '@/utils';
import { fetchFromCityName } from '@/api/fromCityName';
import { WeatherCity } from '@/api/types';
import { fetchFromCoord } from '@/api/fromCoord';

const weatherItems: Module<WeatherItemsState, State> = {
  state: {
    items: [],
    currentItem: null,
    language: 'en',
    error: null,
    isLoading: false
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getCurrentItem(state) {
      return state.currentItem;
    },
    getLanguage(state) {
      return state.language;
    },
    getError(state) {
      return state.error;
    },
    getIsLoading(state) {
      return state.isLoading;
    }
  },
  mutations: {
    addItem(state, value: WeatherCity) {
      const order =
        state.items.length === 0
          ? 1
          : state.items[state.items.length - 1].order + 1;

      const newItem: Item = {
        value,
        id: value.id,
        order
      };

      state.items.push(newItem);
      localStorage.setItem(
        value.name,
        JSON.stringify({ order, cityName: value.name, id: value.id })
      );
    },
    deleteItem(state, id: number) {
      const index = state.items.findIndex((item) => item.id === id);
      const item = state.items.find((item) => item.id === id);

      if (item === undefined) return;

      state.items.splice(index, 1);
      localStorage.removeItem(item.value.name);
    },
    deleteItems(state) {
      state.items.splice(0, state.items.length);
      localStorage.clear();
    },
    changeCurrentItem(state, value: Item | null) {
      state.currentItem = value;
    },
    changeError(state, error: Error | null) {
      state.error = error;
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

      localStorage.removeItem(dropStartItem.value.name);
      localStorage.setItem(
        dropStartItem.value.name,
        JSON.stringify({
          order: dropStartItem.order,
          cityName: dropStartItem.value.name,
          id: dropStartItem.id
        })
      );

      localStorage.removeItem(dropEndItem.value.name);
      localStorage.setItem(
        dropEndItem.value.name,
        JSON.stringify({
          order: dropEndItem.order,
          cityName: dropEndItem.value.name,
          id: dropEndItem.id
        })
      );
    },
    sortItems(state) {
      state.items.sort(sortOrder);
    },
    changeLanguage(state) {
      state.language = state.language === 'en' ? 'ru' : 'en';
    },
    setLanguage(state, language: Language) {
      if (state.language === language) return;

      state.language = language;
    },
    changeIsLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    async getWeatherFromName({ commit, state }, cityName: string) {
      commit('changeIsLoading', true);

      const data = await fetchFromCityName({
        cityName,
        language: state.language
      });

      commit('changeIsLoading', false);
      if (data instanceof Error) {
        commit('changeError', data);
        return;
      }
      commit('addItem', data);
    },
    async getWeatherFromCoord({ commit, state }, { latitude, longitude }) {
      commit('changeIsLoading', true);
      const data = await fetchFromCoord({
        latitude,
        longitude,
        language: state.language
      });
      commit('changeIsLoading', false);

      if (data instanceof Error) {
        commit('changeError', data);
        return;
      }

      commit('addItem', data);
    },
    async changeLanguageActions({ commit, state, dispatch }) {
      if (state.items.length === 0) {
        return;
      }

      const allItems = [...state.items];
      commit('deleteItems');

      async function createNewItems() {
        for (const item of allItems) {
          await dispatch('getWeatherFromName', item.value.name);
        }
      }
      createNewItems();

      localStorage.setItem('appLanguage', JSON.stringify(state.language));
    }
  }
};

export default weatherItems;
