import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID m0qnGKPvyy-2a3UDw7WShr6urlN-MbWMFEycghJTywA',
  },
});

export default async function getImages(query, page) {
  const params = {
    query,
    page,
    per_page: 12,
  };

  const response = await unsplashApi.get('search/photos', { params });
  return response.data;
}
