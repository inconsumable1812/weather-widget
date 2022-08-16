<template>
  <div class="container" ref="containerDOM">
    <SettingsItem
      class="item"
      :id="element.id"
      :name="element.value.name"
      :country="element.value.sys.country"
      :key="element.id"
      :itemIndex="index"
      :containerDOM="containerDOM"
      v-for="(element, index) in items"
    >
    </SettingsItem>
  </div>
  <FormCityName />
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, Item, computed, ref } from 'vue';
import { useStore } from 'vuex';
import FormCityName from './FormCityName.vue';
import SettingsItem from './SettingsItem.vue';

export default defineComponent({
  setup() {
    const store = useStore(key);

    const items = computed({
      get() {
        return store.getters.getItems as Item[];
      },
      set(value) {
        store.commit('changeOrder', value);
      }
    });

    const containerDOM = ref<null | HTMLDivElement>(null);

    return { items, containerDOM };
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
  position: relative;
}
</style>
