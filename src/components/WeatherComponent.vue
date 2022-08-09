<template>
  <p v-if="error" class="error">{{ error.message }}</p>
  <div v-else-if="data !== undefined" class="content">
    <h2 class="name">{{ data.name }}, {{ data.sys.country }}</h2>
    <div class="flex-icon">
      <div class="weather-icon">
        <img :src="weatherURL" :alt="data.weather[0].description" />
      </div>
      <p class="temperature">{{ temperature }}&deg;C</p>
    </div>
    <p class="description">
      {{ language === 'en' ? 'feels like' : 'по ощущениям' }}
      {{ feelsTemperature }}&deg;C.
      {{ data.weather[0].description }}
    </p>
    <div class="flex-gap">
      <div class="icon">
        <div class="icon__item">
          <WindIcon :style="`transform: rotate(${data.wind.deg}deg)`" />
        </div>
        <p class="icon__value">
          {{ data.wind.speed }}{{ language === 'en' ? 'm/s' : 'м/с' }}
        </p>
      </div>
      <div class="icon">
        <div class="icon__item">
          <PressureIcon />
        </div>
        <p class="icon__value">
          {{ data.main.pressure }}{{ language === 'en' ? 'hPa' : 'гПа' }}
        </p>
      </div>
    </div>
    <div class="flex-gap">
      <p class="humidity">
        {{ language === 'en' ? 'humidity' : 'влажность' }}:
        {{ data.main.humidity }}%
      </p>
      <p class="visibility">
        {{ language === 'en' ? 'visibility' : 'видимость' }}:
        {{ data.visibility }}{{ language === 'en' ? 'm' : 'м' }}
      </p>
    </div>
    <div class="flex-gap">
      <p class="sunrise">
        {{ language === 'en' ? 'sunrise' : 'восход' }}: {{ sunrise }}
      </p>
      <p class="sunset">
        {{ language === 'en' ? 'sunset' : 'закат' }}: {{ sunset }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchFromCityName } from '@/api/fromCityName';
import { defineComponent, Language, ref } from 'vue';
import WindIcon from './Icon/WindIcon.vue';
import PressureIcon from './Icon/PressureIcon.vue';
import { findWeatherIconURL, kelvinToCelsius, computedSunTime } from '@/utils';
import { key } from '@/store';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    cityName: { type: String, required: true }
  },
  async setup(props) {
    const store = useStore(key);
    const language = store.getters.getLanguage as Language;
    const error = ref<null | Error>(null);

    const data = await fetchFromCityName({
      cityName: props.cityName,
      language
    });

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
      sunset,
      language
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
  max-width: 300px;
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

.error {
  color: red;
  font-size: 1.5rem;
  text-align: center;
}
</style>
