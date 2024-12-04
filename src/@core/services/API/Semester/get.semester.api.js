import http from "../../../services/Interceptor";
export const GetSemester = async () => {
  try {
    const res = await http.get(`/Term`);
    return res;
  } catch (error) {}
};
export default GetSemester;
