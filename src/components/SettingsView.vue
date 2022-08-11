<template>
  <div class="container" ref="container">
    <SettingsItem
      class="item"
      :id="item.id"
      :name="item.value.name"
      :country="item.value.sys.country"
      v-for="item in items"
      :key="item.id"
      :container="container"
    >
    </SettingsItem>
  </div>
  <FormCityName />
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, Item, ref } from 'vue';
import { useStore } from 'vuex';
import FormCityName from './FormCityName.vue';
import SettingsItem from './SettingsItem.vue';

export default defineComponent({
  setup() {
    const store = useStore(key);
    const items = store.getters.getItems as Item[];
    const container = ref<null | HTMLDivElement>(null);

    return { items, container };
  },
  components: {
    FormCityName,
    SettingsItem
  }
});
</script>

<style lang="scss" scoped>
.item {
  margin: 0 auto;
}

.container {
  margin: 5px 0 12px;
}
</style>
