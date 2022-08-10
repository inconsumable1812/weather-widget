<template>
  <div class="container">
    <SettingsItem
      class="item"
      :id="item.id"
      :name="item.value.name"
      :country="item.value.sys.country"
      v-for="item in items"
      :key="item.id"
    >
    </SettingsItem>
  </div>
  <FormCityName />
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, Item } from 'vue';
import { useStore } from 'vuex';
import FormCityName from './FormCityName.vue';
import SettingsItem from './SettingsItem.vue';

export default defineComponent({
  setup() {
    const store = useStore(key);
    const items = store.getters.getItems as Item[];

    return { items };
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
</style>
