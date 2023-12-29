import axios from "axios";

const instance = axios.create({
  // baseURL: "https://bada-123-201-174-45.ngrok-free.app/scimics",
  baseURL: "https://scimics-api.onrender.com/scimics",
});

export default instance;
