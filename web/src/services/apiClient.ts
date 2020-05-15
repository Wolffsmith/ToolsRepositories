import axios from 'axios';

// Base da URL de conexão com a API, altere para o endereço da sua API
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
