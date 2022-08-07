<template>
  <div v-if="error">{{ error.message }}</div>
  <pre v-else>{{ JSON.stringify(data, null, 2) }}</pre>
</template>

<script lang="ts">
import { fetchFromCityName } from '@/api/fromCityName';
import { defineComponent, ref } from 'vue';

export default defineComponent({
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
