import http from "../../../Interceptor";
export const DeleteCourse = async (params = "") => {
  try {
    const res = await http.delete("/Course/DeleteCourse", params);
    return res;
  } catch (error) {
    console.log(error);
  }
};
