<template>
  <div v-if="error" class="error"></div>
  <div v-else-if="data !== undefined" class="content">
    <h2 class="name">{{ data.name }}, {{ data.sys.country }}</h2>
    <div class="flex-icon">
      <div class="weather-icon">
        <img :src="weatherURL" :alt="data.weather[0].description" />
      </div>
      <div class="temperature">{{ temperature }}&deg;C</div>
    </div>
    <div class="description">
      feels like {{ feelsTemperature }}&deg;C.
      {{ data.weather[0].description }}
    </div>
    <div class="flex-gap">
      <div class="wind">
        <div class="wind-direction">
          <WindIcon :style="`transform: rotate(${data.wind.deg}deg)`" />
        </div>
        <div class="wind-speed">{{ data.wind.speed }}m/s</div>
      </div>
      <div class="pressure">{{ data.main.pressure }}hPa</div>
    </div>
    <div class="flex-gap">
      <div class="humidity">humidity: {{ data.main.humidity }}%</div>
      <div class="visibility">visibility: {{ data.visibility }}m</div>
    </div>
    <div class="flex-gap">
      <div class="sunrise">sunrise: {{ sunrise }}</div>
      <div class="sunset">sunset: {{ sunset }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchFromCityName } from '@/api/fromCityName';
import { defineComponent, ref } from 'vue';
import WindIcon from './WindIcon.vue';
import { findWeatherIconURL, kelvinToCelsius, computedSunTime } from '@/utils';

export default defineComponent({
  props: {
    cityName: { type: String, required: true }
  },
  async setup(props) {
    const error = ref<null | Error>(null);
    const data = await fetchFromCityName({ cityName: props.cityName });

    if (data instanceof Error) {
      error.value = data;
      return { error };
    }

    const weatherURL = findWeatherIconURL(data.weather[0].icon);
    const temperature = kelvinToCelsius(data.main.temp);
    const feelsTemperature = kelvinToCelsius(data.main.feels_like);
    const sunrise = computedSunTime(data.sys.sunrise);
    const sunset = computedSunTime(data.sys.sunset);

    return {
      data,
      error,
      weatherURL,
      temperature,
      feelsTemperature,
      sunrise,
      sunset
    };
  },
  components: {
    WindIcon
  }
});
</script>

<style scoped>
.content {
  margin: 0 auto;
  max-width: 370px;
  border: 2px solid rgb(132, 132, 132);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 2px rgb(165, 187, 255);
}

.flex-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.temperature {
  font-size: 1.5rem;
  font-weight: bold;
}

.flex-gap {
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 10px;
  margin: 10px 0;
}

.wind {
  display: flex;
  align-items: center;
}
.wind-direction {
  min-width: 35px;
}
</style>
