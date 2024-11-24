import http from "../../../Interceptor";
export const getCourseGroup = async (teacherId = "", courseId = "") => {
  try {
    const res = await http.get(
      `/CourseGroup/GetCourseGroup?TeacherId=${teacherId}&CourseId=${courseId}`
    );
    return res;
  } catch (error) {}
};
