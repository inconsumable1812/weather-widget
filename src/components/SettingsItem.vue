<template>
  <div>
    <TrashIcon />
    <BurgerIcon />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TrashIcon from './Icon/TrashIcon.vue';
import BurgerIcon from './Icon/BurgerIcon.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    TrashIcon,
    BurgerIcon
  }
});
</script>

<style scoped></style>
