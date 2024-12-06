import http from "../../../Interceptor";
export const getCourseGroup = async (teacherId = "", courseId = "") => {
  try {
    const res = await http.get(
      `/CourseGroup/GetCourseGroup?TeacherId=${teacherId}&CourseId=${courseId}`
    );
    console.log(res);
    return res;
  } catch (error) {}
};
