type Kelvin = number;
type hPa = number;
type percent = number;
type meter = number;
type meterPerSec = number;
type unixUTC = number;
type secondsShiftUTC = number;

type Coord = {
  lon: number;
  lat: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Main = {
  temp: Kelvin;
  feels_like: Kelvin;
  temp_min: Kelvin;
  temp_max: Kelvin;
  pressure: hPa;
  humidity: percent;
};

type Wind = {
  speed: meterPerSec;
  deg: number;
};

type Clouds = {
  all: percent;
};

type Sys = {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: unixUTC;
  sunset: unixUTC;
};

type WeatherCity = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: meter;
  wind: Wind;
  clouds: Clouds;
  dt: unixUTC;
  sys: Sys;
  timezone: secondsShiftUTC;
  id: number;
  name: string;
  cod: number;
};

export type { WeatherCity };
