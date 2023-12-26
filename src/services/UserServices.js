import instance from "./axios";

class UserServices {
  getColleges = () => instance.post("/getcolleges");
  getCourses = (id) => instance.post(`/getcourses/${id}`);

  updateUser = (data) => instance.post(`/updateuser`, data);
  updateUserPswd = (data) => instance.post(`/updatepassword`, data);

  addReport = (data) => instance.post(`/addreport`, data);
  getReports = (id) => instance.post(`/getreports/${id}`);
}

export default new UserServices();
