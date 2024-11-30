import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.210:3000/api'
});
// Alterar o endereço ip de acordo com a maquina
export default api;