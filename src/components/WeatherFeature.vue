<template>
  <div class="icon">
    <div
      :onclick="handleChangeView"
      class="icon__item"
      v-if="view === 'weather'"
    >
      <GearIcon />
    </div>
    <div :onclick="handleChangeView" class="icon__item" v-else>
      <CancelIcon />
    </div>
  </div>
  <WeatherList v-if="view === 'weather'" />
  <SettingsView v-else-if="view === 'settings'" />
</template>

<script lang="ts">
import { defineComponent, Item, ref } from 'vue';
import WeatherList from './WeatherList.vue';
import SettingsView from './SettingsView.vue';
import GearIcon from './Icon/GearIcon.vue';
import CancelIcon from './Icon/CancelIcon.vue';
import { key } from '@/store';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    WeatherList,
    SettingsView,
    GearIcon,
    CancelIcon
  },
  setup() {
    const view = ref<'weather' | 'settings'>('weather');
    const store = useStore(key);
    const storeItems = store.getters.getItems as Item[];

    const handleChangeView = () => {
      if (view.value === 'weather') {
        view.value = 'settings';
      } else {
        view.value = 'weather';
      }
    };

    const localKeys = Object.keys(localStorage);
    const items: Item[] = [];

    for (const localKey of localKeys) {
      const itemJSON = localStorage.getItem(localKey);
      if (itemJSON !== null) {
        const itemObject = JSON.parse(itemJSON);
        if (itemObject.cityName !== undefined) {
          items.push(itemObject);
        }
      }
    }

    items.forEach((item) => {
      const index = storeItems.findIndex(
        (storeItem) => storeItem.cityName === item.cityName
      );
      const isExist = index !== -1;
      if (isExist) return;

      store.commit('addItemFromStorage', item);
    });

    return {
      view,
      handleChangeView
    };
  }
});
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: end;
  cursor: pointer;

  &__item {
    max-width: 40px;
    max-height: 40px;
  }
}
</style>
