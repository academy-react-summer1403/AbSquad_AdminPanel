import http from "../../../services/Interceptor";
export const GetDepartment = async () => {
  try {
    const res = await http.get(`/Department`);
    return res;
  } catch (error) {}
};
export default GetDepartment;
