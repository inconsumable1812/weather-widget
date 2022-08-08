<template>
  <div class="item">
    <div class="title">
      <div draggable="true" class="burger icon"><BurgerIcon /></div>
      <p class="name">{{ name }}, {{ country }}</p>
    </div>
    <div :onclick="removeItem" class="trash icon"><TrashIcon /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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

    return { removeItem };
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
}

.title {
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.icon {
  max-width: 30px;
  max-height: 30px;
  cursor: pointer;
}

.burger {
  cursor: unset;
}
</style>
