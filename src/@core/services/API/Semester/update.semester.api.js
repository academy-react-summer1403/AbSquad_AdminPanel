import http from "../../../services/Interceptor";
export const UpdateSemester = async (data = "") => {
  try {
    const res = await http.put(`/Term`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
export default UpdateSemester;
