import http from "../../../services/Interceptor";
export const AllCourseAdmin = async (searchParams = {}) => {
  try {
    const res = await http.get(`/Course/CourseList`, { params: searchParams });
    return res;
  } catch (error) {}
};
