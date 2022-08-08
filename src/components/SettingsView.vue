<template>
  <SettingsItem />
  <FormCityName />
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import FormCityName from './FormCityName.vue';
import SettingsItem from './SettingsItem.vue';

export default defineComponent({
  setup() {
    const store = useStore(key);
    const items = store.getters.getItems;

    return { items };
  },
  components: {
    FormCityName,
    SettingsItem
  }
});
</script>

<style lang="scss" scoped></style>
