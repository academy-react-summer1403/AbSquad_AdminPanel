import http from "../../../services/Interceptor";
export const EditDepartmentApi = async (data = "") => {
  try {
    const res = await http.put(`/Department`, data);
    return res;
  } catch (error) {}
};
export default EditDepartmentApi;
