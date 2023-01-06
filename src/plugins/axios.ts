import axios from "axios";

const base = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL,
});

const auth = (token: string | null) => {
  return axios.create({
    baseURL: import.meta.env.VITE_AXIOS_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { base, auth };
