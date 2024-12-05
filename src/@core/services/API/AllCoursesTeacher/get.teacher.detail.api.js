import http from "../../../services/Interceptor";
export const GetTeacherDetailApi = async (searchParams = {}) => {
  try {
    const res = await http.get(`/Home/GetTeacherDetails`, {
      params: searchParams,
    });
    return res;
  } catch (error) {}
};
