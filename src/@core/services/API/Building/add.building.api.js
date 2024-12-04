import http from "../../../services/Interceptor";
export const AddBuildingApi = async (data = "") => {
  try {
    const res = await http.post(`/Building`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
export default AddBuildingApi;
