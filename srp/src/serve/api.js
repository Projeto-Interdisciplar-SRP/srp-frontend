import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5173/api', // Ajuste a porta conforme sua configuração
});

export default api;