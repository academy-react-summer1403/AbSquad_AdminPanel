import http from "../../../services/Interceptor";
export const GetSemesterDetailApi = async (id = "") => {
  try {
    const res = await http.get(`/Term/${id}`);
    return res;
  } catch (error) {}
};
export default GetSemesterDetailApi;
