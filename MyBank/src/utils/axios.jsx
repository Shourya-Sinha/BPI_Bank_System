import axios from 'axios';
// config
export const BASE_URL = 'http://localhost:7878'
// export const BASE_URL = 'https://bpi-bank-system.onrender.com'

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;