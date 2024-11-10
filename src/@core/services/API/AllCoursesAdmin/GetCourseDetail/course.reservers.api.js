import http from "../../../Interceptor";
export const GetCourseReserver = async (params = "") => {
  try {
    const res = await http.get("/CourseReserve/" + params);
    return res;
  } catch (error) {}
};
