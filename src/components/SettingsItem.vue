<template>
  <div
    draggable="true"
    v-on:drag.prevent=""
    v-on:dragstart.prevent=""
    class="item"
  >
    <div class="item__title">
      <div class="burger handle item__icon" :onpointerdown="handlerPointerDown">
        <BurgerIcon />
      </div>
      <p class="item__name">{{ name }}, {{ country }}</p>
    </div>
    <div :onclick="removeItem" class="trash item__icon"><TrashIcon /></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, Item, PropType } from 'vue';
import TrashIcon from './Icon/TrashIcon.vue';
import BurgerIcon from './Icon/BurgerIcon.vue';
import { key } from '@/store';
import { useStore } from 'vuex';

export default defineComponent({
  setup(props) {
    const store = useStore(key);
    const removeItem = () => {
      store.commit('deleteItem', props.id);
    };

    const items = computed(() => {
      return store.getters.getItems as Item[];
    });

    const findIndex = ({
      itemsHeightPoint,
      itemPointerY,
      topBorder,
      bottomBorder
    }: {
      itemsHeightPoint: number[];
      itemPointerY: number;
      topBorder: number;
      bottomBorder: number;
    }) => {
      if (itemPointerY <= topBorder) return 0;
      if (itemPointerY >= bottomBorder) return itemsHeightPoint.length - 1;

      let index = -1;
      for (const heightPoint of itemsHeightPoint) {
        if (heightPoint >= itemPointerY) {
          break;
        }
        index += 1;
      }

      return index;
    };

    function arrayMove(arr: any[], fromIndex: number, toIndex: number) {
      const element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }

    let prevIndexCallbackMove = -1;

    const callbackMove = (e: Event) => {
      const containerHeight = props.containerDOM.getBoundingClientRect().height;
      const containerTop = props.containerDOM.getBoundingClientRect().top;
      const containerBottom = props.containerDOM.getBoundingClientRect().bottom;
      const itemHeight = containerHeight / items.value.length;
      const itemsHeightPoint = new Array(items.value.length)
        .fill('')
        .map((_, i) => containerTop + i * itemHeight);
      const itemPointerY = (e as PointerEvent).clientY;

      const index = findIndex({
        itemsHeightPoint,
        itemPointerY,
        topBorder: containerTop,
        bottomBorder: containerBottom
      });

      if (prevIndexCallbackMove === index) return;

      prevIndexCallbackMove = index;

      const newArray = [...items.value];
      arrayMove(newArray, props.itemIndex, index);

      console.log(index, 'index');
      console.log(
        newArray.map((item) => item.value.name),
        'newArray'
      );

      store.commit('changeOrder', newArray);
    };

    const callbackUp = (e: Event) => {
      if (e.currentTarget === null) return;

      e.currentTarget.removeEventListener('pointermove', callbackMove);
      e.currentTarget.removeEventListener('pointerup', callbackUp);
    };

    const handlerPointerDown = (e: PointerEvent) => {
      if (props.containerDOM === null) return;
      if (e.currentTarget === null) return;
      if (items.value.length <= 1) return;

      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      e.currentTarget.addEventListener('pointermove', callbackMove);
      e.currentTarget.addEventListener('pointerup', callbackUp);
    };

    return {
      removeItem,
      handlerPointerDown
    };
  },
  components: {
    TrashIcon,
    BurgerIcon
  },
  props: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    id: { type: Number, required: true },
    itemIndex: { type: Number, required: true },
    containerDOM: { type: Object as PropType<HTMLDivElement>, required: true }
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
  position: relative;
  user-select: none;
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
