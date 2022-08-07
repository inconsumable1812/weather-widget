import type { WeatherCity } from '../types';

type QueryParameters = {
  latitude: number;
  longitude: number;
};

type Response = Partial<WeatherCity>;

export type { QueryParameters, Response };
