import http from "../../../Interceptor";
export const GetCourseDetailApi = async (params = "") => {
  try {
    const res = await http.get("/Course/" + params);
    return res;
  } catch (error) {}
};
