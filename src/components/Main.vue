<template>
  <div v-if="error">{{ error.message }}</div>
  <WeatherComponent
    v-else-if="data !== undefined"
    :city-name="data.name"
  ></WeatherComponent>
  <p>Что-то пошло не так</p>
</template>

<script lang="ts">
import { fetchFromCityName } from '@/api/fromCityName';
import { defineComponent, ref } from 'vue';
import WeatherComponent from './WeatherComponent.vue';

export default defineComponent({
  async setup() {
    const error = ref<null | Error>(null);
    const data = await fetchFromCityName({ cityName: 'irkutsk' });

    if (data instanceof Error) {
      error.value = data;
      return { error };
    }

    return { data, error };
  },
  components: {
    WeatherComponent
  }
});
</script>

<style scoped></style>
