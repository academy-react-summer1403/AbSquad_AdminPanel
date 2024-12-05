import http from "../../../services/Interceptor";
export const AddCourseSocialGroupApi = async (data = {}) => {
  try {
    const res = await http.post(`/CourseSocialGroup`, data);
    return res;
  } catch (error) {}
};
export default AddCourseSocialGroupApi;
