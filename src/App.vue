<template>
  <WeatherFeature />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherFeature from './components/WeatherFeature.vue';

export default defineComponent({
  name: 'App',
  components: {
    WeatherFeature
  }
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  touch-action: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 1260px;
  margin: 0 auto;
  padding: 10px;
}
</style>
