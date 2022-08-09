import { Item } from 'vue';

const sortOrder = (a: Item, b: Item) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
};

export { sortOrder };
