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
import { key } from '@/store';
import { useStore } from 'vuex';
import { sortOrder } from '@/utils';
import { fetchFromCoord } from '@/api/fromCoord';

export default defineComponent({
  components: {
    WeatherList,
    SettingsView,
    GearIcon,
    CancelIcon,
    ToggleLanguage
  },
  setup() {
    const view = ref<'weather' | 'settings'>('weather');
    const geolocationError = ref<null | Error | GeolocationPositionError>(null);
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

    items.sort(sortOrder).forEach((item) => {
      const index = storeItems.findIndex(
        (storeItem) => storeItem.cityName === item.cityName
      );
      const isExist = index !== -1;
      if (isExist) return;

      store.commit('addItemFromStorage', item);
    });

    async function success(pos: GeolocationPosition) {
      const { latitude, longitude } = pos.coords;
      const data = await fetchFromCoord({ latitude, longitude });

      if (data instanceof Error) {
        geolocationError.value = data;
        return;
      }

      store.commit('addItem', {
        newName: data.name,
        country_code: data.sys.country
      });
    }

    function error(error: GeolocationPositionError) {
      geolocationError.value = error;
    }

    if (storeItems.length === 0) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true
      });
    }

    return {
      view,
      handleChangeView,
      geolocationError
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
</style>
