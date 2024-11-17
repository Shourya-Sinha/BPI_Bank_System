import axios from 'axios';
// config
// export const BASE_URL = 'http://localhost:7878'
export const BASE_URL = 'https://bpi-bank-system.onrender.com'
// 
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  // (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
  (error) => {
    // Check if the error response contains a message and set it directly on error.message
    if (error.response && error.response.data && error.response.data.message) {
      error.message = error.response.data.message; // Setting error.message directly
    } else {
      error.message = 'Something went wrong'; // Fallback message
    }
    return Promise.reject(error); // Reject the modified error
  }
);

export default axiosInstance;