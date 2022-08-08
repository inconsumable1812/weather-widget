<template>
  <form :onsubmit="handleSubmit" class="form">
    <label class="label">
      <h3 class="title">Add Location:</h3>
      <div class="input">
        <vue-dadata
          :locationOptions="locationOptions"
          v-model="query"
          fromBound="city"
          toBound="settlement"
          :token="token"
          v-model:suggestion="suggestion"
        ></vue-dadata>
      </div>
    </label>
    <button class="icon"><EnterIcon /></button>
  </form>
</template>

<script lang="ts">
import { key } from '@/store';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import EnterIcon from './Icon/EnterIcon.vue';
import { Suggestion, VueDadata } from 'vue-dadata';
import { isCityExist } from '@/utils';
import 'vue-dadata/dist/style.css';

type RightSuggestion = Suggestion & {
  data: { country_iso_code: string };
};

export default defineComponent({
  setup() {
    const query = ref('');
    const suggestion = ref<RightSuggestion | undefined>(undefined);
    const store = useStore(key);

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      if (suggestion.value === undefined) {
        return;
      }

      const newCity = suggestion.value.data.city;
      if (newCity !== null) {
        if (isCityExist(store.getters.getItems, newCity)) {
          return;
        }

        store.commit('addItem', {
          newName: newCity,
          country_code: suggestion.value.data.country_iso_code
        });
        query.value = '';
        suggestion.value = undefined;

        return;
      }

      const newSettlement = suggestion.value.data.settlement;
      if (newSettlement !== null) {
        if (isCityExist(store.getters.getItems, newSettlement)) {
          return;
        }

        store.commit('addItem', {
          newName: newSettlement,
          country_code: suggestion.value.data.country_iso_code
        });
        query.value = '';
        suggestion.value = undefined;
      }
    };

    return {
      handleSubmit,

      suggestion,
      token: process.env.VUE_APP_API_KEY_DADATA,
      query,
      locationOptions: {
        language: 'en',
        locations: [{ country: '*', bounds: 'city' }]
      }
    };
  },
  components: {
    EnterIcon,
    VueDadata
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
}

.label {
  grid-area: label;
  display: grid;
  grid-template-rows: $rows;
  grid-template-areas:
    'title'
    'input';
}

.title {
  grid-area: title;
}

.input {
  grid-area: input;
}

.icon {
  max-width: 30px;
  max-height: 30px;
  grid-area: icon;
  cursor: pointer;
  background: none;
  border: none;
}
</style>
