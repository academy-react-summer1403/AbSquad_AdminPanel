import http from "../../../Interceptor";
export const GetUserCourseDetail = async (courseId = "") => {
  try {
    const res = await http.get(`/Home/GetCourseDetails?CourseId=${courseId}`);
    return res;
  } catch (error) {}
};
