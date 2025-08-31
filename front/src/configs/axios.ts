import axios from "axios";
import { URL } from "./config";
import { persistor } from "../redux/store";

const apiClient = axios.create({
  baseURL: URL,
  responseType: 'json',
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

apiClient.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(`${URL}/auth/refresh`, { withCredentials: true });

      localStorage.setItem('accessToken', response.data.accessToken);
      return apiClient.request(originalRequest);
    } catch (e) {
      console.log('Unauthorized!', e);
      localStorage.removeItem('token');
      // await persistor.purge();
    }
  }
  throw error;
});

export default apiClient;
