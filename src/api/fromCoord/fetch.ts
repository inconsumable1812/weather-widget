import type { QueryParameters, Response } from './types';

const fetch = async ({
  latitude,
  longitude,
  language = 'en'
}: QueryParameters): Promise<Response | globalThis.Error> => {
  try {
    const languageRU = language === 'ru' ? '&lang=ru' : '';

    const response = await globalThis.fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}${languageRU}&appid=${process.env.VUE_APP_API_KEY}`
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
