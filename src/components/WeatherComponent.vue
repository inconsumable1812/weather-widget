<template>
  <div>
    <h2>Город</h2>
    <div>настр. {{ temperatureComp }}</div>
  </div>
  <div>
    <div class="weather-icon"></div>
    <div class="temperature"></div>
  </div>
  <div class="description">
    <div class="wind"></div>
    <div class="pressure"></div>
  </div>
  <div class="">
    <div class="humidity"></div>
    <div class="visibility"></div>
    <div class="sunrise"></div>
    <div class="sunset"></div>
  </div>
</template>

<script lang="ts">
import { fetchFromCityName } from '@/api/fromCityName';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    cityName: { type: String, required: true },
    weatherIcon: { type: String, required: true },
    temperature: { type: Number, required: true },
    windDirection: { type: Number, required: true },
    windSpeed: { type: Number, required: true },
    pressure: { type: Number, required: true },
    humidity: { type: Number, required: true },
    visibility: { type: Number, required: true },
    sunrise: { type: Number, required: true },
    sunset: { type: Number, required: true }
  },
  async setup() {
    const error = ref<null | Error>(null);
    const data = await fetchFromCityName({ cityName: 'irkutsk' });

    if (data instanceof Error) {
      error.value = data;
      return { error };
    }

    return { data, error };
  }
});
</script>

<style scoped></style>
