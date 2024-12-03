import http from "../../../../services/Interceptor";
export const UpdateComment = async (data = "") => {
  try {
    const res = await http.put(`/Course/UpdateCourseComment`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
