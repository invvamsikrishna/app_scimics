import axios from "axios";
import instance from "./axios";

class AuthServices {
  loginPerson = (data) => instance.post("/login", data);
  signupPerson = (data) => instance.post("/signup", data);

  getGoogleUserInfo = (token) =>
    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
  googleLoginPerson = (data) => instance.post("/googlesignuporlogin", data);
  githubLoginPerson = () => instance.post("/github/callback");
  sendOtptoEmail = (data) => instance.post("/sendotp", data);
  verifyOtptoEmail = (data) => instance.post("/verifyotp", data);
}

export default new AuthServices();
