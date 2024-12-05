import http from "../../../services/Interceptor";
export const GetCourseSocialGroupApi = async () => {
  try {
    const res = await http.get(`/CourseSocialGroup`);
    return res;
  } catch (error) {}
};
export default GetCourseSocialGroupApi;
