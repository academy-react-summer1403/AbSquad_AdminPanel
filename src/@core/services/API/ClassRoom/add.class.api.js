import http from "../../../services/Interceptor";
export const AddClassRoomApi = async (data = "") => {
  try {
    const res = await http.post(`/ClassRoom`, data);
    return res;
  } catch (error) {}
};
export default AddClassRoomApi;
