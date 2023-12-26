import axios from "axios";

const instance = axios.create({
  // baseURL: "https://2db9-123-201-174-192.ngrok-free.app/scimics",
  baseURL: "https://scimics-api.onrender.com/scimics",
});

export default instance;
