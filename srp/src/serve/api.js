// // src/services/api.js
// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:8080https://a3c8-2804-7f0-a218-1f0d-2814-49d6-7583-3181.ngrok-free.app/', // Ajuste conforme necessário
// });

// Interceptor para adicionar o token nas requisições
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default api;
