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
import { defineComponent, ref } from 'vue';
import WeatherList from './WeatherList.vue';
import SettingsView from './SettingsView.vue';
import GearIcon from './GearIcon.vue';
import CancelIcon from './CancelIcon.vue';

export default defineComponent({
  components: {
    WeatherList,
    SettingsView,
    GearIcon,
    CancelIcon
  },
  setup() {
    const view = ref<'weather' | 'settings'>('weather');

    const handleChangeView = () => {
      if (view.value === 'weather') {
        view.value = 'settings';
      } else {
        view.value = 'weather';
      }
    };

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
