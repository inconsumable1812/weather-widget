function getHours(date: Date, timeOffset: number) {
  const hoursUTC = date.getUTCHours();
  const offsetHour = timeOffset / 60 / 60;
  const hour = (hoursUTC + offsetHour) % 24;

  return hour.toString().length === 1 ? '0' + hour.toString() : hour.toString();
}

const computedSunTime = (unixInSecond: number, timeOffset: number) => {
  const date = new Date(unixInSecond * 1000);
  const hours = getHours(date, timeOffset);
  const minutes =
    date.getUTCMinutes().toString().length === 1
      ? '0' + date.getUTCMinutes().toString()
      : date.getUTCMinutes().toString();

  const time = `${hours}:${minutes}`;

  return time;
};

export { computedSunTime };
