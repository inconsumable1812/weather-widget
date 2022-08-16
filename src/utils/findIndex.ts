const findIndex = ({
  itemsHeightPoint,
  itemPointerY,
  topBorder,
  bottomBorder
}: {
  itemsHeightPoint: number[];
  itemPointerY: number;
  topBorder: number;
  bottomBorder: number;
}) => {
  if (itemPointerY <= topBorder) return 0;
  if (itemPointerY >= bottomBorder) return itemsHeightPoint.length - 1;

  let index = -1;
  for (const heightPoint of itemsHeightPoint) {
    if (heightPoint >= itemPointerY) {
      break;
    }
    index += 1;
  }

  return index;
};

export { findIndex };
