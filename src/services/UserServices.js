import instance from "./axios";

class UserServices {
  getColleges = () => instance.post("/getcolleges");
  getCourses = (id) => instance.post(`/getcourses/${id}`);

  updateUser = (data) => instance.post(`/updateuser`, data);
  updateUserPswd = (data) => instance.post(`/updatepassword`, data);

  getExamQuestions = (data) => instance.post(`/generatepaper`, data);
  validateExamTest = (id, data) => instance.post(`/validatepaper/${id}`, { data: data });

  getReports = (id) => instance.post(`/getreports/${id}`);
}

export default new UserServices();
