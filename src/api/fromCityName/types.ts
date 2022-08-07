import type { WeatherCity } from '../types';

type QueryParameters = {
  cityName: string;
};

type Response = Partial<WeatherCity>;

export type { QueryParameters, Response };
