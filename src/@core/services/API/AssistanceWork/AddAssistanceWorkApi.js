import http from "../../../services/Interceptor";
export const AddAssistanceWorkApi = async (data = "") => {
  try {
    const res = await http.post(`/AssistanceWork`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
export default AddAssistanceWorkApi;
