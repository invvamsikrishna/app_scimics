import axios from "axios";

const instance = axios.create({
  // baseURL: "https://5fb4-123-201-175-123.ngrok-free.app/scimics",
  baseURL: "https://scimics-api.onrender.com/scimics",
});

export default instance;
