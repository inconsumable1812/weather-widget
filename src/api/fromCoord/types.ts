import { Language } from 'vue';
import type { WeatherCity } from '../types';

type QueryParameters = {
  latitude: number;
  longitude: number;
  language?: Language;
};

type Response = WeatherCity;

export type { QueryParameters, Response };
