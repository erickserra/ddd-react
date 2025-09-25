import axios from 'axios';

export const createBaseHttpClient = () => {
  // WIP: maybe change this to a React Context or Redux Persist pattern in the future...
  const jwtToken = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};
