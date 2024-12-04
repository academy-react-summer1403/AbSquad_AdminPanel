import http from "../../../services/Interceptor";
export const EditBuildingApi = async (data = "") => {
  try {
    const res = await http.put(`/Building`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
export default EditBuildingApi;
