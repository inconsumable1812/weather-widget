import type { WeatherCity } from '../types';

type QueryParameters = {
  cityName: string;
};

type Response = WeatherCity;

export type { QueryParameters, Response };
