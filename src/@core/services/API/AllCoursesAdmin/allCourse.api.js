import http from "../../../services/Interceptor";
export const AllCourseAdmin = async (searchParams = {}) => {
  try {
    const res = await http.get(`/Course/CourseList`, { params: searchParams });
    console.log(res);
    return res;
  } catch (error) {}
};
