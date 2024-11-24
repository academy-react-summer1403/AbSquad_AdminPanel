import http from "../../../Interceptor";
export const ActiveDeactiveCourse = async (params = "") => {
  try {
    const res = await http.put("/Course/ActiveAndDeactiveCourse", params);
    return res;
  } catch (error) {}
};
