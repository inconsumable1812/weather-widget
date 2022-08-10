<template>
  <div class="item" ref="itemDOM">
    <div class="item__title">
      <div
        draggable="true"
        :ondragstart="handlerDragStart"
        :ondragleave="handlerDragLeave"
        :ondragend="handlerDragEnd"
        :ondragover="handlerDragOver"
        :ondrop="handlerDrop"
        class="burger item__icon"
      >
        <BurgerIcon />
      </div>
      <p class="item__name">{{ name }}, {{ country }}</p>
    </div>
    <div :onclick="removeItem" class="trash item__icon"><TrashIcon /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Item, ref } from 'vue';
import TrashIcon from './Icon/TrashIcon.vue';
import BurgerIcon from './Icon/BurgerIcon.vue';
import { key } from '@/store';
import { useStore } from 'vuex';

export default defineComponent({
  setup(props) {
    const store = useStore(key);
    const items = store.getters.getItems as Item[];
    const currentItem = items.find((item) => item.id === props.id);
    const itemDOM = ref<null | HTMLDivElement>(null);

    const removeItem = () => {
      if (currentItem === undefined) return;

      store.commit('deleteItem', props.id);
    };

    const handlerDragStart = () => {
      if (currentItem === undefined) return;

      store.commit('changeCurrentItem', currentItem);
    };

    const handlerDragLeave = () => {
      if (itemDOM.value === null) return;
      itemDOM.value.style.background = '#eee';
    };

    const handlerDragEnd = () => {
      if (itemDOM.value === null) return;
      itemDOM.value.style.background = '#eee';
    };

    const handlerDragOver = (e: Event) => {
      e.preventDefault();
      if (itemDOM.value === null) return;

      itemDOM.value.style.background = 'rgb(159, 159, 159)';
    };

    const handlerDrop = (e: Event) => {
      e.preventDefault();
      if (itemDOM.value === null) return;
      if (currentItem === undefined) return;

      store.commit('changeOrder', currentItem);
      store.commit('sortItems');
      itemDOM.value.style.background = '#eee';
    };

    return {
      removeItem,
      handlerDragStart,
      handlerDragLeave,
      handlerDragOver,
      handlerDragEnd,
      handlerDrop,
      itemDOM
    };
  },
  components: {
    TrashIcon,
    BurgerIcon
  },
  props: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    id: { type: Number, required: true }
  }
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eee;
  padding: 5px;
  max-width: 350px;

  &__title {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }

  &__icon {
    max-width: 30px;
    max-height: 30px;
    cursor: pointer;
  }

  &__name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.burger {
  cursor: grab;
}
</style>
