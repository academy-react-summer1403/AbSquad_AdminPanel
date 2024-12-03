import http from "../../Interceptor";
export const EditTechApi = async (data = "") => {
  try {
    const res = await http.put(`/Technology`, data);
    return res;
  } catch (error) {}
};
export default EditTechApi;
