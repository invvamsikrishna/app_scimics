import instance from "./axios";

class UserServices {
  getColleges = () => instance.post("/getcolleges");
  getCourses = (id) => instance.post(`/getcourses/${id}`);

  updateUser = (data) => instance.post(`/updateuser`, data);
  updateUserPswd = (data) => instance.post(`/updatepassword`, data);
}

export default new UserServices();
