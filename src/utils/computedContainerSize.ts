import { Item } from 'vue';

type Args = {
  containerDOM: HTMLDivElement;
  items: Item[];
  event: MouseEvent | TouchEvent;
  itemHeight: number;
};

const computedContainerSize = ({
  containerDOM,
  items,
  event,
  itemHeight
}: Args) => {
  const containerTop = containerDOM.getBoundingClientRect().top;
  const containerBottom = containerDOM.getBoundingClientRect().bottom;
  const itemsHeightPoint = new Array(items.length)
    .fill('')
    .map((_, i) => containerTop + i * itemHeight);
  const itemPointerY =
    event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

  return event instanceof MouseEvent
    ? { containerTop, containerBottom, itemsHeightPoint, itemPointerY }
    : { containerTop, containerBottom, itemsHeightPoint };
};

export { computedContainerSize };
