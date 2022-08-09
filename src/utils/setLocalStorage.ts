import { Item } from 'vue';

const setLocalStorage = (newCity: string, items: Item[]) => {
  localStorage.setItem(
    newCity,
    JSON.stringify(items.find((item) => item.cityName === newCity))
  );
};

export { setLocalStorage };
