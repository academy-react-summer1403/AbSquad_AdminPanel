import http from "../../../services/Interceptor";
export const AllTeacherCourse = async (searchParams = {}) => {
  try {
    const res = await http.get(`/Course/TeacherCourseList`, {
      params: searchParams,
    });
    return res;
  } catch (error) {}
};
