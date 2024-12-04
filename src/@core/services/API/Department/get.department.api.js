import http from "../../../services/Interceptor";
export const GetDepartmentApi = async () => {
  try {
    const res = await http.get(`/Department`);
    return res;
  } catch (error) {}
};
export default GetDepartmentApi;
