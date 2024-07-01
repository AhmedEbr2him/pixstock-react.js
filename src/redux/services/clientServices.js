import { urlEncode } from '../../utils/urlEncode';

const API_KEY = 'GDwvJ7Bp5XJdwmmdw7efKiTl5bcbLtyK3s8aOCpFDU7gOtekt3tqGZny';
const headers = new Headers();
headers.append('Authorization', API_KEY);
const requestOption = { headers };

/* CREATE MAIN DATA FUNCTION */
const fetchData = async (url, successCallback) => {
  const response = await fetch(url, requestOption);

  if (response.ok) {
    const data = await response.json();
    return successCallback(data);
  }
};

const root = {
  default: 'https://api.pexels.com/v1/',
  videos: 'https://api.pexels.com/videos/',
};
let requestUrl = '';

/* PHOTOS */
const fetchPhotos = {
  search: (parameters, callback) => {
    requestUrl = `${root.default}search?${urlEncode(parameters)}`;
    return fetchData(requestUrl, callback);
  },
  curated: (parameters, callback) => {
    requestUrl = `${root.default}curated?${urlEncode(parameters)}`;
    return fetchData(requestUrl, callback);
  },
  detail: (id, callback) => {
    requestUrl = `${root.default}photos/${id}`;
    return fetchData(requestUrl, callback);
  },
};
/* VIDEOS */
const fetchVideos = {
  search: async (parameters, callback) => {
    requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
    return fetchData(requestUrl, callback);
  },
  popular: async (parameters, callback) => {
    requestUrl = `${root.videos}popular?${urlEncode(parameters)}`;
    return fetchData(requestUrl, callback);
  },
  detail: async (id, callback) => {
    requestUrl = `${root.videos}videos/${id}`;
    return fetchData(requestUrl, callback);
  },
};
/* COLLECTIONS */
const fetchCollection = {
  featured: async (parameters, callback) => {
    requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
    return fetchData(requestUrl, callback);
  },
  detail: async (id, parameters, callback) => {
    requestUrl = `${root.default}collections/${id}?${urlEncode(parameters)}`;
    return fetchData(requestUrl, callback);
  },
};
const clientServices = {
  fetchPhotos,
  fetchVideos,
  fetchCollection,
};
export default clientServices;
