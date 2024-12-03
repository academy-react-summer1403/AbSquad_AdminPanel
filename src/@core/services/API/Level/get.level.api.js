import http from "../../../services/Interceptor";
export const GetLevelApi = async () => {
  try {
    const res = await http.get(`/CourseLevel/GetAllCourseLevel`);
    return res;
  } catch (error) {}
};
export default GetLevelApi;
