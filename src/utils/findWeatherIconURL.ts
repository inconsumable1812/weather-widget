const findWeatherIconURL = (iconCode: string) => {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export { findWeatherIconURL };
