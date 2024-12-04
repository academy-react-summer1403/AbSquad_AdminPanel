import http from "../../Interceptor";
export const AddTechApi = async (data = "") => {
  try {
    const res = await http.post(`/Technology`, data);
    return res;
  } catch (error) {}
};
export default AddTechApi;
