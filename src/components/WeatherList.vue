<template>
  <div class="gear">
    <div class="gear__item"><GearIcon /></div>
  </div>

  <Suspense>
    <WeatherComponent :city-name="'irkutsk'" />

    <template #fallback>Загрузка...</template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherComponent from './WeatherComponent.vue';
import GearIcon from './GearIcon.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    WeatherComponent,
    GearIcon
  }
});
</script>

<style lang="scss" scoped>
.gear {
  display: flex;
  justify-content: end;
  cursor: pointer;

  &__item {
    max-width: 40px;
    max-height: 40px;
  }
}
</style>
