import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Ajuste a porta conforme sua configuração
});

export default api;