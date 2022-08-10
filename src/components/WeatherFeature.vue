<template>
  <div class="settings">
    <div class="settings__switcher">
      <ToggleLanguage />
    </div>
    <div
      :onclick="handleChangeView"
      class="settings__icon"
      v-if="view === 'weather'"
    >
      <GearIcon />
    </div>
    <div :onclick="handleChangeView" class="settings__icon" v-else>
      <CancelIcon />
    </div>
  </div>

  <p v-if="geolocationError" class="error">
    {{ geolocationError.message }}
  </p>
  <p v-else-if="error !== null" class="error">
    {{ error.message }}
  </p>
  <div v-else-if="loading" class="loader"><LoaderComponent /></div>
  <div v-else>
    <WeatherList v-if="view === 'weather'" />
    <SettingsView v-else-if="view === 'settings'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Item, ref } from 'vue';
import WeatherList from './WeatherList.vue';
import SettingsView from './SettingsView.vue';
import GearIcon from './Icon/GearIcon.vue';
import CancelIcon from './Icon/CancelIcon.vue';
import ToggleLanguage from './ToggleLanguage.vue';
import LoaderComponent from './LoaderComponent.vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import { sortOrder } from '@/utils';
import { LocalStorageItem } from '@/types';

export default defineComponent({
  components: {
    WeatherList,
    SettingsView,
    GearIcon,
    CancelIcon,
    ToggleLanguage,
    LoaderComponent
  },
  setup() {
    const view = ref<'weather' | 'settings'>('weather');
    const geolocationError = ref<null | Error | GeolocationPositionError>(null);
    const store = useStore(key);
    const storeItems = store.getters.getItems as Item[];
    const loading = ref(false);
    const error = store.getters.getError as Error | null;

    const handleChangeView = () => {
      if (view.value === 'weather') {
        view.value = 'settings';
      } else {
        view.value = 'weather';
      }
    };

    const localKeys = Object.keys(localStorage);
    const items: LocalStorageItem[] = [];
    for (const localKey of localKeys) {
      const itemJSON = localStorage.getItem(localKey);
      if (itemJSON !== null) {
        const itemObject = JSON.parse(itemJSON);

        if (itemObject.cityName !== undefined) {
          items.push(itemObject);
        }
      }
    }

    items.sort(sortOrder).forEach(async (item) => {
      const index = storeItems.findIndex(
        (storeItem) => storeItem.id === item.id
      );
      const isExist = index !== -1;
      if (isExist) return;

      store.commit('changeCurrentCityName', item.cityName);
      loading.value = true;
      await store.dispatch('getWeatherFromName');
      loading.value = false;
      store.commit('changeCurrentCityName', null);
    });

    async function success(pos: GeolocationPosition) {
      const { latitude, longitude } = pos.coords;

      store.commit('changeCoord', { latitude, longitude });
      loading.value = true;
      await store.dispatch('getWeatherFromCoord');
      loading.value = false;
      store.commit('changeCoord', { latitude: null, longitude: null });
    }

    function errorCallback(error: GeolocationPositionError) {
      geolocationError.value = error;
    }

    if (items.length === 0) {
      navigator.geolocation.getCurrentPosition(success, errorCallback, {
        enableHighAccuracy: true
      });
    }

    return {
      view,
      handleChangeView,
      geolocationError,
      loading,
      error
    };
  }
});
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  gap: 10px;

  &__icon {
    max-width: 40px;
    max-height: 40px;
  }
}

.error {
  color: red;
  font-size: 1.5rem;
  text-align: center;
}

.loader {
  text-align: center;
}
</style>
