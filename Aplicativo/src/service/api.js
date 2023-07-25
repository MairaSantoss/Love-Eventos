import axios from "axios";

const api = axios.create({
  baseURL: 'http://172.16.20.151/triboon',
});

export default api;


