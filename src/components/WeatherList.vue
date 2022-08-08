<template>
  <Suspense>
    <WeatherComponent :city-name="'irkutsk'" />

    <template #fallback>
      <div class="container">
        <p class="loading">Загрузка...</p>
      </div>
    </template>
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

<style lang="scss" scoped>
.loading {
  text-align: center;
  font-size: 1.5rem;
}

.container {
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 293px;
}
</style>
