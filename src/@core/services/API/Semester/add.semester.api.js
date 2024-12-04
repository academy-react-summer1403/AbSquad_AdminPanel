import http from "../../../services/Interceptor";
export const AddSemester = async (data = "") => {
  try {
    const res = await http.post(`/Term`, data);
    return res;
  } catch (error) {}
};
export default AddSemester;
