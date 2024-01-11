import instance from "./axios";

class AdminServices {
  getCategoriesList = () => instance.post(`/getcategoryandsubcategory`);
  getQuestionsByCategory = (data) => instance.post(`/getallquestionsbycategory`, data);

  addMcqQuestion = (data) => instance.post(`/approveq`, data);
  updateMcqQuestion = (id, data) => instance.post(`/updateq/${id}`, data);
  deleteMcqQuestion = (id) => instance.post(`/deleteq/${id}`);
}

export default new AdminServices();
