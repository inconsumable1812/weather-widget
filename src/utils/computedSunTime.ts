const computedSunTime = (unixInSecond: number) => {
  const date = new Date(unixInSecond * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const time = `${hours}:${minutes}`;

  return time;
};

export { computedSunTime };
