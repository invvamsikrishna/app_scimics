import instance from "./axios";

class AuthServices {
  loginPerson = (data) => instance.post("/login", data);
  signupPerson = (data) => instance.post("/signup", data);
  googleLoginPerson = (data) => instance.post("/signuporlogin", data);
  sendOtptoEmail = (data) => instance.post("/sendotp", data);
  verifyOtptoEmail = (data) => instance.post("/verifyotp", data);
}

export default new AuthServices();
