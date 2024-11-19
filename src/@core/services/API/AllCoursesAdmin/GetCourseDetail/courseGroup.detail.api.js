import http from "../../../Interceptor";
export const GetCourseGroupDetail = async (groupId = "") => {
  try {
    const res = await http.get(`/CourseGroup/Details?Id=${groupId}`);
    return res;
  } catch (error) {}
};
