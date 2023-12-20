import axios from "axios";

const instance = axios.create({
  // baseURL: "https://765c-203-109-75-65.ngrok-free.app/scimics",
  baseURL: "https://scimics-api.onrender.com/scimics",
});

export default instance;
