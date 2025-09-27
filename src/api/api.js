import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:5000/api/v1",
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default api;
