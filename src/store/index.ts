import { InjectionKey, State } from 'vue';
import { createStore, Store } from 'vuex';
import weatherItems from './weatherItems';
import language from './language';

export const key: InjectionKey<Store<State>> = Symbol('Store');

export default createStore({
  modules: {
    weatherItems,
    language
  }
});
