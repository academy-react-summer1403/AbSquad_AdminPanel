import http from "../../../Interceptor";
export const CreateCourseApi = async (formDatas = "") => {
  try {
    const res = await http.post("/Course", formDatas);
    return res;
  } catch (error) {}
};
