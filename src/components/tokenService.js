import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pre.bistrainer.com/rest/testapi',
});

let isRefreshing = false;
let failedQueue = [];

const refreshToken = async () => {
  try {
    const response = await axios.post('https://pre.bistrainer.com/rest/testapi/token', {
      clientid: '6502bc96-7514-11ef-93b8-00155dd31a80',
      clientsecret: 'e06923eddc18fbeba89b1665304f9407'
    });
    const newToken = response.data.access_token;

    
    localStorage.setItem('token', newToken);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  response => response, 
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return refreshToken().then(newToken => {
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;

        failedQueue.forEach(prom => prom.resolve(newToken));
        failedQueue = [];

        return axiosInstance(originalRequest);
      }).catch(err => {
        failedQueue.forEach(prom => prom.reject(err));
        failedQueue = [];
        return Promise.reject(err);
      }).finally(() => {
        isRefreshing = false;
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
