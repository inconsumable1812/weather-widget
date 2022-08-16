<template>
  <div
    ref="rootDOM"
    v-on:touchstart="touchDownHandler"
    v-on:touchmove="touchMoveHandler"
    v-on:touchend="touchUpHandler"
    v-on:touchcancel="touchUpHandler"
    v-on:drag.prevent="callbackMove"
    v-on:dragend="dragEndHandler"
    class="item"
  >
    <div class="item__title">
      <div class="burger handle item__icon" v-on:mousedown="mouseDownHandler">
        <BurgerIcon />
      </div>
      <p class="item__name">{{ name }}, {{ country }}</p>
    </div>
    <div :onclick="removeItem" class="trash item__icon"><TrashIcon /></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, Item, PropType, ref } from 'vue';
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

    const rootDOM = ref<null | HTMLDivElement>(null);
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const isDesktop = mediaQuery.matches;

    const mouseDownHandler = () => {
      if (rootDOM.value === null) return;
      rootDOM.value.draggable = true;
    };

    const dragEndHandler = () => {
      if (rootDOM.value === null) return;
      rootDOM.value.draggable = false;
    };

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

      if (itemPointerY === 0) return;

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

    let dragElement: HTMLDivElement | null = null;

    const touchDownHandler = (e: TouchEvent) => {
      if (props.containerDOM === null) return;
      if (rootDOM.value === null) return;

      const containerHeight = props.containerDOM.getBoundingClientRect().height;
      const itemHeight = containerHeight / items.value.length;

      dragElement = rootDOM.value.cloneNode(true) as HTMLDivElement;
      dragElement.classList.add('drag-element');
      dragElement.style.width = rootDOM.value.clientWidth + 'px';
      dragElement.style.top = itemHeight * props.itemIndex + 'px';
      dragElement.style.left =
        props.containerDOM.clientWidth / 2 -
        rootDOM.value.clientWidth / 2 +
        'px';

      props.containerDOM.append(dragElement);
    };

    const touchMoveHandler = (e: TouchEvent) => {
      if (dragElement === null) return;
      if (rootDOM.value === null) return;
      if (props.containerDOM === null) return;

      const containerHeight = props.containerDOM.getBoundingClientRect().height;
      const itemHeight = containerHeight / items.value.length;

      const centerY =
        rootDOM.value.getBoundingClientRect().top + itemHeight / 2;
      const offsetX = rootDOM.value.getBoundingClientRect().left + 22;
      const clientY = e.touches[0].clientY;
      const clientX = e.touches[0].clientX;
      const deltaY = clientY - centerY;
      const deltaX = clientX - offsetX;

      dragElement.style.top = itemHeight * props.itemIndex + 'px';
      dragElement.style.left =
        props.containerDOM.clientWidth / 2 -
        rootDOM.value.clientWidth / 2 +
        'px';

      dragElement.style.transform = `matrix(1, 0, 0, 1, ${deltaX}, ${deltaY})`;

      const containerTop = props.containerDOM.getBoundingClientRect().top;
      const containerBottom = props.containerDOM.getBoundingClientRect().bottom;
      const itemsHeightPoint = new Array(items.value.length)
        .fill('')
        .map((_, i) => containerTop + i * itemHeight);

      if (clientY === 0) return;

      const index = findIndex({
        itemsHeightPoint,
        itemPointerY: clientY,
        topBorder: containerTop,
        bottomBorder: containerBottom
      });

      if (prevIndexCallbackMove === index) return;

      prevIndexCallbackMove = index;

      const newArray = [...items.value];
      arrayMove(newArray, props.itemIndex, index);

      store.commit('changeOrder', newArray);
    };

    const touchUpHandler = (e: TouchEvent) => {
      if (dragElement === null) return;
      dragElement.remove();
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
      handlerPointerDown,
      callbackMove,
      touchDownHandler,
      touchUpHandler,
      rootDOM,
      mouseDownHandler,
      dragEndHandler,
      touchMoveHandler
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

.drag-element {
  position: absolute;
  opacity: 0.8;
  z-index: 5;
}

.burger {
  cursor: grab;
}
</style>
