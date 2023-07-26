import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost/loveEvento',
});

export default api;


