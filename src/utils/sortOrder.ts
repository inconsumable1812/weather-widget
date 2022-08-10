import { Item } from 'vue';

const sortOrder = (a: Pick<Item, 'order'>, b: Pick<Item, 'order'>) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
};

export { sortOrder };
