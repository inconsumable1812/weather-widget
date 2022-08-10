import { Item } from 'vue';

const isCityExist = (items: Item[], newName: string) => {
  if (items.length === 0) return false;

  const index = items.findIndex((item) => item.value.name === newName);

  if (index === -1) {
    return false;
  }

  return true;
};

export { isCityExist };
