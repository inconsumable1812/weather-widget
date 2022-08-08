<template>
  <Suspense>
    <div class="list">
      <WeatherComponent
        :id="item.id"
        v-for="item in items"
        :key="item.id"
        :city-name="item.cityName"
      />
    </div>

    <template #fallback>
      <div class="container">
        <p class="loading">Загрузка...</p>
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, Item } from 'vue';
import { useStore } from 'vuex';
import WeatherComponent from './WeatherComponent.vue';

export default defineComponent({
  setup() {
    const store = useStore(key);
    const items = store.getters.getItems as Item[];

    return { items };
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

.list {
  display: grid;
  column-gap: 10px;
  row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
}
</style>
