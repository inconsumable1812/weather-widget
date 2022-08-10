<template>
  <div class="list">
    <WeatherComponent
      :id="item.id"
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
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
.list {
  display: grid;
  column-gap: 10px;
  row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
