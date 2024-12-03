import http from "../../../services/Interceptor";
export const EditLevelApi = async (data = "") => {
  try {
    const res = await http.put(`/CourseLevel`, data);
    return res;
  } catch (error) {}
};
export default EditLevelApi;
