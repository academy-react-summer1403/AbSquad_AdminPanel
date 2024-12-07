import http from "../../Interceptor";
export const EditAssistanceWorkAPI = async () => {
  try {
    const res = await http.put(`/AssistanceWork`);
    return res;
  } catch (error) {}
};
export default EditAssistanceWorkAPI;
