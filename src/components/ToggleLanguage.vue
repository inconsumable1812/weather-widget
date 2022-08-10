<template>
  <div class="toggle">
    <label class="toggle__label">
      <input
        v-model="isRussianLanguage"
        type="checkbox"
        class="toggle__input"
      />
      <span class="toggle__checkbox"></span>
      <span class="toggle__english">EN</span>
      <span class="toggle__russian">RU</span>
    </label>
  </div>
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, Language, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore(key);
    const language = store.getters.getLanguage as Language;
    const isRussianLanguage = ref(language === 'ru');

    watch(isRussianLanguage, () => {
      store.commit('changeLanguage');
      store.dispatch('changeLanguageActions');
    });

    return { isRussianLanguage, language };
  }
});
</script>

<style lang="scss" scoped>
.toggle {
  width: 100%;
  margin: 10px 0;
  user-select: none;

  &__label {
    cursor: pointer;
    position: relative;
  }

  &__checkbox {
    position: absolute;
    height: 1.25rem;
    width: 2.5rem;
    border: 0.0625rem solid #1f204140;
    border-radius: 0.625rem;

    &::before {
      $size: 0.75rem;

      position: absolute;
      content: '';
      top: 50%;
      transform: translateY(-50%);
      left: 0.18rem;
      width: $size;
      height: $size;
      border-radius: 0.375rem;
      background: #bc9cff;
    }
  }

  &__input {
    appearance: none;
    position: absolute;

    &:checked + .toggle__checkbox::before {
      transform: translateX(20px) translateY(-50%);
      transition: transform 0.25s ease-in-out;
    }

    &:not(:checked) + .toggle__checkbox::before {
      transform: translateX(0) translateY(-50%);
      transition: transform 0.25s ease-in-out;
    }

    &:focus + .toggle__checkbox,
    &:hover + .toggle__checkbox {
      box-shadow: 0px 0px 1px 1px #1f204140;
    }
  }

  &__english {
    position: absolute;
    right: 115%;
  }

  &__russian {
    padding-left: 46px;
  }
}
</style>
