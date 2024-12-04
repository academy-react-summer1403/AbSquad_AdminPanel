import http from "../../../services/Interceptor";
export const AddDepartmentApi = async (data = "") => {
  try {
    const res = await http.post(`/Department`, data);
    return res;
  } catch (error) {}
};
export default AddDepartmentApi;
