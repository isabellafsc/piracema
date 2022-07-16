import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/db/db.json",
});

export default api;