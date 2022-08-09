import { Language } from 'vue';
import type { WeatherCity } from '../types';

type QueryParameters = {
  cityName: string;
  language?: Language;
};

type Response = WeatherCity;

export type { QueryParameters, Response };
