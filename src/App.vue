<template>
  <Suspense>
    <WeatherList />

    <template #fallback>Загрузка</template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherList from './components/WeatherList.vue';

export default defineComponent({
  name: 'App',
  components: {
    WeatherList
  }
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 1260px;
  margin: 0 auto;
  padding: 10px;
}
</style>
