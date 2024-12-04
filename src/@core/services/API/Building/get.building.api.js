import http from "../../../services/Interceptor";
export const GetBuildingApi = async () => {
  try {
    const res = await http.get(`/Building`);
    return res;
  } catch (error) {}
};
export default GetBuildingApi;
