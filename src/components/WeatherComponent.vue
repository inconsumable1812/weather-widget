<template>
  <div class="content">
    <h2 class="name">{{ item.value.name }}, {{ item.value.sys.country }}</h2>
    <div class="flex-icon">
      <div class="weather-icon">
        <img :src="weatherURL" :alt="item.value.weather[0].description" />
      </div>
      <p class="temperature">{{ temperature }}&deg;C</p>
    </div>
    <p class="description">
      {{ language === 'en' ? 'feels like' : 'по ощущениям' }}
      {{ feelsTemperature }}&deg;C.
      {{ item.value.weather[0].description }}
    </p>
    <div class="flex-gap">
      <div class="icon">
        <div class="icon__item">
          <WindIcon :style="`transform: rotate(${item.value.wind.deg}deg)`" />
        </div>
        <p class="icon__value">
          {{ item.value.wind.speed }}{{ language === 'en' ? 'm/s' : 'м/с' }}
        </p>
      </div>
      <div class="icon">
        <div class="icon__item">
          <PressureIcon />
        </div>
        <p class="icon__value">
          {{ item.value.main.pressure }}{{ language === 'en' ? 'hPa' : 'гПа' }}
        </p>
      </div>
    </div>
    <div class="flex-gap">
      <p class="humidity">
        {{ language === 'en' ? 'humidity' : 'влажность' }}:
        {{ item.value.main.humidity }}%
      </p>
      <p class="visibility">
        {{ language === 'en' ? 'visibility' : 'видимость' }}:
        {{ item.value.visibility }}{{ language === 'en' ? 'm' : 'м' }}
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
import { defineComponent, Language, Item, PropType } from 'vue';
import WindIcon from './Icon/WindIcon.vue';
import PressureIcon from './Icon/PressureIcon.vue';
import { findWeatherIconURL, kelvinToCelsius, computedSunTime } from '@/utils';
import { key } from '@/store';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    item: { type: Object as PropType<Item>, required: true }
  },
  setup(props) {
    const store = useStore(key);
    const language = store.getters.getLanguage as Language;

    const weatherURL = findWeatherIconURL(props.item.value.weather[0].icon);
    const temperature = kelvinToCelsius(props.item.value.main.temp);
    const feelsTemperature = kelvinToCelsius(props.item.value.main.feels_like);
    const sunrise = computedSunTime(
      props.item.value.sys.sunrise,
      props.item.value.timezone
    );
    const sunset = computedSunTime(
      props.item.value.sys.sunset,
      props.item.value.timezone
    );

    return {
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
</style>
