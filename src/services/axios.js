import axios from "axios";

const instance = axios.create({
  baseURL: "https://7846-123-201-171-159.ngrok-free.app/scimics",
  // baseURL: "https://scimics-api.onrender.com/scimics",
});

export default instance;
