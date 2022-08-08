import { WeatherItems, State, Item } from 'vue';
import { Module } from 'vuex';

const weatherItems: Module<State, WeatherItems> = {
  state: {
    items: [],
    currentCard: null
  },
  getters: {
    getCityNames(state) {
      return state.items.map((name) => name.cityName);
    },
    getCurrentCard(state) {
      return state.currentCard;
    }
  },
  mutations: {
    addName(state, newName: string) {
      const newItem: Item = {
        cityName: newName,
        id: new Date().getTime(),
        order: state.items.length + 1
      };

      state.items.push(newItem);
    },
    deleteName(state, id: number) {
      state.items.filter((currentItem) => currentItem.id !== id);
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
      const handlerSort = (a: Item, b: Item) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      };

      state.items.sort(handlerSort);
    }
  },
  actions: {}
};

export default weatherItems;
