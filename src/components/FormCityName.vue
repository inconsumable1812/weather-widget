<template>
  <div class="root">
    <form :onsubmit="handleSubmit" class="form">
      <label class="form__label">
        <h3 class="form__title">
          {{ language === 'en' ? 'Add Location:' : 'Добавить место:' }}
        </h3>
        <div class="form__input">
          <vue-dadata
            :locationOptions="locationOptions"
            v-model="query"
            fromBound="city"
            toBound="city"
            :token="token"
            v-model:suggestion="suggestion"
          ></vue-dadata>
        </div>
      </label>
      <button class="form__icon"><EnterIcon /></button>
    </form>
    <div v-if="loading" class="loader"><LoaderComponent /></div>
  </div>
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, Language, ref, computed } from 'vue';
import { useStore } from 'vuex';
import EnterIcon from './Icon/EnterIcon.vue';
import LoaderComponent from './LoaderComponent.vue';
import { Suggestion, VueDadata } from 'vue-dadata';
import { isCityExist } from '@/utils';
import 'vue-dadata/dist/style.css';

export default defineComponent({
  setup() {
    const store = useStore(key);
    const language = computed(() => store.getters.getLanguage as Language);
    const query = ref('');
    const suggestion = ref<Suggestion | undefined>(undefined);
    const loading = computed(() => store.getters.getIsLoading as boolean);

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      if (suggestion.value === undefined) {
        return;
      }

      const newCity = suggestion.value.data.city;
      if (newCity !== null) {
        if (isCityExist(store.getters.getItems, newCity)) {
          return;
        }

        await store.dispatch('getWeatherFromName', newCity);
        query.value = '';
        suggestion.value = undefined;
      }
    };

    const locationOptions = computed(() => ({
      language: language.value,
      locations: [{ country: '*', bounds: 'city' }]
    }));

    return {
      handleSubmit,
      loading,
      suggestion,
      token: process.env.VUE_APP_API_KEY_DADATA,
      query,
      language,
      locationOptions
    };
  },
  components: {
    EnterIcon,
    VueDadata,
    LoaderComponent
  }
});
</script>

<style lang="scss" scoped>
$rows: 25px 1fr;

.form {
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-template-rows: $rows;
  gap: 5px;
  grid-template-areas:
    'label mock'
    'label icon';

  &__label {
    grid-area: label;
    display: grid;
    grid-template-rows: $rows;
    grid-template-areas:
      'title'
      'input';
  }
  &__title {
    grid-area: title;
  }

  &__input {
    grid-area: input;
  }

  &__icon {
    max-width: 30px;
    max-height: 30px;
    grid-area: icon;
    cursor: pointer;
    background: none;
    border: none;
  }
}

.root {
  position: relative;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
