import http from "../../../services/Interceptor";
export const AddLevelApi = async (data = "") => {
  try {
    const res = await http.post(`/CourseLevel`, data);
    return res;
  } catch (error) {}
};
export default AddLevelApi;
