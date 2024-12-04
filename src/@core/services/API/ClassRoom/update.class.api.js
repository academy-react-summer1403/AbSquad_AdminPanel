import http from "../../../services/Interceptor";
export const EditClassRoomApi = async (data = "") => {
  try {
    const res = await http.put(`/ClassRoom`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
export default EditClassRoomApi;
