<template>
  <div v-if="error" class="error"></div>
  <div v-else-if="data !== undefined" class="content">
    <h2 class="name">{{ data.name }}, {{ data.sys.country }}</h2>
    <div class="flex-icon">
      <div class="weather-icon">
        <img :src="weatherURL" :alt="data.weather[0].description" />
      </div>
      <p class="temperature">{{ temperature }}&deg;C</p>
    </div>
    <p class="description">
      feels like {{ feelsTemperature }}&deg;C.
      {{ data.weather[0].description }}
    </p>
    <div class="flex-gap">
      <div class="icon">
        <div class="icon__item">
          <WindIcon :style="`transform: rotate(${data.wind.deg}deg)`" />
        </div>
        <p class="icon__value">{{ data.wind.speed }}m/s</p>
      </div>
      <div class="icon">
        <div class="icon__item">
          <PressureIcon />
        </div>
        <p class="icon__value">{{ data.main.pressure }}hPa</p>
      </div>
    </div>
    <div class="flex-gap">
      <p class="humidity">humidity: {{ data.main.humidity }}%</p>
      <p class="visibility">visibility: {{ data.visibility }}m</p>
    </div>
    <div class="flex-gap">
      <p class="sunrise">sunrise: {{ sunrise }}</p>
      <p class="sunset">sunset: {{ sunset }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchFromCityName } from '@/api/fromCityName';
import { defineComponent, ref } from 'vue';
import WindIcon from './Icon/WindIcon.vue';
import PressureIcon from './Icon/PressureIcon.vue';
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
    const sunrise = computedSunTime(data.sys.sunrise, data.timezone);
    const sunset = computedSunTime(data.sys.sunset, data.timezone);

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
    WindIcon,
    PressureIcon
  }
});
</script>

<style lang="scss" scoped>
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
  justify-content: flex-start;
  align-items: center;
  column-gap: 10px;
  margin: 10px 0;
}

.icon {
  display: flex;
  align-items: center;

  &__item {
    max-width: 35px;
    max-height: 35px;
  }

  &__value {
    padding: 5px 0 0;
  }
}
</style>
