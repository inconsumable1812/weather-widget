<template>
  <form :onsubmit="handleSubmit" class="form">
    <label class="label"
      ><h3 class="title">Add Location:</h3>
      <input class="input" v-model="newCityName" type="text"
    /></label>
    <button class="icon"><EnterIcon /></button>
  </form>
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import EnterIcon from './Icon/EnterIcon.vue';

export default defineComponent({
  setup() {
    const store = useStore(key);
    const newCityName = ref('');
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      store.commit('addName', newCityName.value.trim());
      newCityName.value = '';
    };

    return { newCityName, handleSubmit };
  },
  components: {
    EnterIcon
  }
});
</script>

<style lang="scss" scoped>
.input {
  margin-top: 5px;
  padding: 5px;

  &:focus {
    outline-color: rgb(74, 74, 249);
  }
}

.form {
  display: grid;
  grid-template-columns: max-content;
  gap: 5px;
  grid-template-areas:
    'label mock'
    'label icon';
}

.label {
  grid-area: label;
}

.icon {
  max-width: 35px;
  max-height: 35px;
  grid-area: icon;
  cursor: pointer;
  background: none;
  border: none;
}
</style>
