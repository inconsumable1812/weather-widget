import { WeatherItems, State, Item } from 'vue';
import { Module } from 'vuex';
import { sortOrder } from '@/utils';

const weatherItems: Module<State, WeatherItems> = {
  state: {
    items: [],
    currentCard: null
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getCurrentCard(state) {
      return state.currentCard;
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
    changeCurrentCard(state, value: Item | null) {
      state.currentCard = value;
    },
    changeOrder(state, card: Item) {
      state.items.map((c) => {
        if (state.currentCard === null) {
          return c;
        }

        if (c.id === card.id) {
          return { ...c, order: state.currentCard.order };
        }

        if (c.id === state.currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      });
    },
    sortItems(state) {
      state.items.sort(sortOrder);
    }
  },
  actions: {}
};

export default weatherItems;
