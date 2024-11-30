import http from "../../../Interceptor";
export const UpdateCourseApi = async (formDatas = "") => {
  try {
    const res = await http.put("/Course", formDatas);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
