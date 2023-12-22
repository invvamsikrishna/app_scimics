import axios from "axios";

const instance = axios.create({
  // baseURL: "https://18c8-123-201-171-127.ngrok-free.app/scimics",
  baseURL: "https://scimics-api.onrender.com/scimics",
});

export default instance;
