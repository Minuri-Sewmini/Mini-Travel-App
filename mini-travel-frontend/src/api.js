import axios from 'axios';

const API = axios.create({ baseURL: 'mini-travel-app-production.up.railway.app' });

export default API;