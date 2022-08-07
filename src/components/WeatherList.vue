<template>
  <Suspense>
    <WeatherComponent />

    <template #fallback>Загрузка</template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherComponent from './WeatherComponent.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    WeatherComponent
  }
});
</script>

<style scoped></style>
