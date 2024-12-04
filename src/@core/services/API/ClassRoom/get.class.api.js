import http from "../../../services/Interceptor";
export const GetClassRoomApi = async () => {
  try {
    const res = await http.get(`/ClassRoom`);
    return res;
  } catch (error) {}
};
export default GetClassRoomApi;
