import { LanguageState, State } from 'vue';
import { Module } from 'vuex';

const language: Module<LanguageState, State> = {
  state: {
    language: 'en'
  },
  getters: {
    getLanguage(state) {
      return state.language;
    }
  },
  mutations: {
    changeLanguage(state) {
      state.language = state.language === 'en' ? 'ru' : 'en';
    }
  }
};

export default language;
