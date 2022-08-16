<template>
  <div
    ref="rootDOM"
    v-on:touchstart="touchDownHandler"
    v-on:touchmove="touchMoveHandler"
    v-on:touchend="touchUpHandler"
    v-on:touchcancel="touchUpHandler"
    v-on:drag.prevent="dragHandler"
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
import { computed, defineComponent, Item, PropType, ref } from 'vue';
import TrashIcon from './Icon/TrashIcon.vue';
import BurgerIcon from './Icon/BurgerIcon.vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import { arrayMove, computedContainerSize, findIndex } from '@/utils';

export default defineComponent({
  setup(props) {
    const store = useStore(key);
    const rootDOM = ref<null | HTMLDivElement>(null);
    const removeItem = () => {
      store.commit('deleteItem', props.id);
    };

    const items = computed(() => {
      return store.getters.getItems as Item[];
    });

    const mouseDownHandler = () => {
      if (rootDOM.value === null) return;
      rootDOM.value.draggable = true;
    };

    const dragEndHandler = () => {
      if (rootDOM.value === null) return;
      rootDOM.value.draggable = false;
    };

    let prevIndexMove = -1;

    const dragHandler = (event: MouseEvent) => {
      if (props.containerDOM === null) return;
      if (rootDOM.value === null) return;

      const itemHeight = rootDOM.value.clientHeight;
      const { itemsHeightPoint, itemPointerY, containerTop, containerBottom } =
        computedContainerSize({
          containerDOM: props.containerDOM,
          items: items.value,
          event,
          itemHeight
        });
      if (itemPointerY === 0 || itemPointerY === undefined) return;

      const index = findIndex({
        itemsHeightPoint,
        itemPointerY,
        topBorder: containerTop,
        bottomBorder: containerBottom
      });
      if (prevIndexMove === index) return;
      prevIndexMove = index;

      const newArray = [...items.value];
      arrayMove(newArray, props.itemIndex, index);

      store.commit('changeOrder', newArray);
    };

    let dragElement: HTMLDivElement | null = null;

    const touchDownHandler = () => {
      if (props.containerDOM === null) return;
      if (rootDOM.value === null) return;

      const itemHeight = rootDOM.value.clientHeight;

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

    const touchMoveHandler = (event: TouchEvent) => {
      if (dragElement === null) return;
      if (rootDOM.value === null) return;
      if (props.containerDOM === null) return;

      const itemHeight = rootDOM.value.clientHeight;
      const centerY =
        rootDOM.value.getBoundingClientRect().top + itemHeight / 2;
      const offsetX = rootDOM.value.getBoundingClientRect().left + 22;
      const clientY = event.touches[0].clientY;
      const clientX = event.touches[0].clientX;

      const { itemsHeightPoint, containerTop, containerBottom } =
        computedContainerSize({
          containerDOM: props.containerDOM,
          items: items.value,
          event,
          itemHeight
        });

      dragElement.style.top = itemHeight * props.itemIndex + 'px';
      dragElement.style.left =
        props.containerDOM.clientWidth / 2 -
        rootDOM.value.clientWidth / 2 +
        'px';
      dragElement.style.transform = `matrix(1, 0, 0, 1, ${clientX - offsetX}, ${
        clientY - centerY
      })`;

      if (clientY === 0) return;

      const index = findIndex({
        itemsHeightPoint,
        itemPointerY: clientY,
        topBorder: containerTop,
        bottomBorder: containerBottom
      });

      if (prevIndexMove === index) return;
      prevIndexMove = index;

      const newArray = [...items.value];
      arrayMove(newArray, props.itemIndex, index);

      store.commit('changeOrder', newArray);
    };

    const touchUpHandler = () => {
      if (dragElement === null) return;
      dragElement.remove();
    };

    return {
      removeItem,
      dragHandler,
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
  margin: 0 auto;
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
