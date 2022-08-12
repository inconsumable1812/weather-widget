<template>
  <div class="container">
    <Draggable v-model="items" handle=".handle" group="items" item-key="order">
      <template #item="{ element }">
        <SettingsItem
          class="item"
          :id="element.id"
          :name="element.value.name"
          :country="element.value.sys.country"
          :key="element.id"
        >
        </SettingsItem>
      </template>
    </Draggable>
  </div>
  <FormCityName />
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, Item, computed } from 'vue';
import Draggable from 'vuedraggable';
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

    return { items };
  },
  components: {
    FormCityName,
    SettingsItem,
    Draggable
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
