import type { QueryParameters, Response } from './types';

const fetch = async ({
  cityName,
  language = 'en'
}: QueryParameters): Promise<Response | globalThis.Error> => {
  try {
    const languageRU = language === 'ru' ? '&lang=ru' : '';

    const response = await globalThis.fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${languageRU}&appid=${process.env.VUE_APP_API_KEY}`
    );

    const data = await response.json();

    if (data.message !== undefined) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return <globalThis.Error>error;
  }
};

export { fetch };
