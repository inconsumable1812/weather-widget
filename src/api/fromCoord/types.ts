import type { WeatherCity } from '../types';

type QueryParameters = {
  latitude: number;
  longitude: number;
};

type Response = WeatherCity;

export type { QueryParameters, Response };
