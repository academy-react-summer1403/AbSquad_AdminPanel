import http from "../../Interceptor";
export const AssistanceWorkAPI = async () => {
  try {
    const res = await http.get(`/AssistanceWork`);
    return res;
  } catch (error) {}
};
export default AssistanceWorkAPI;
