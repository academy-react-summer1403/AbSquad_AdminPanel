import http from "../../Interceptor";
export const GetTechApi = async () => {
  try {
    const res = await http.get(`/Technology`);
    return res;
  } catch (error) {}
};
export default GetTechApi;
