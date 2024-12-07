import http from "../../../services/Interceptor";
export const EditCourseSocialGroupApi = async (data = {}) => {
  try {
    const res = await http.put(`/CourseSocialGroup`, data);
    return res;
  } catch (error) {}
};
export default EditCourseSocialGroupApi;
