const baseUrl = 'https://api.unsplash.com';

type ImageData = {
  id: string;
  description: string;
  urls: {
    small: string;
  };
};

export type SearchImagesResult = {
  total: number;
  total_pages: number;
  results: Array<ImageData>;
};

const createRequest = async (url: string, init: RequestInit = { method: 'GET' }) => {
  const accessKey = process.env.REACT_APP_ACCESS_KEY;
  const res = await fetch(`${baseUrl}${url}`, {
    ...init,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      ...init?.headers,
    },
  });

  if (res.status < 200 || res.status >= 400) {
    throw Error('Something went wrong. Please try again later');
  }

  return res;
};

export const extractUrls = (imageList?: Array<ImageData>) =>
  imageList ? imageList.map((data) => data.urls.small) : [];

export const searchImages = async (
  query: string = 'nature',
  page: number = 0
): Promise<SearchImagesResult> => {
  const result = await createRequest(
    `/search/photos?orientation=landscape&per_page=12&page=${page}&query=${query}`
  );

  return result.json();
};
