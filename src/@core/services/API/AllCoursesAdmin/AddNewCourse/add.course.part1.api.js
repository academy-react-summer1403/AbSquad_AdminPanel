import http from "../../../Interceptor";
export const CreateCourseApi = async (formDatas = "") => {
  try {
    console.log(formDatas);
    const res = await http.post("/Course", formDatas);
    return res;
  } catch (error) {}
};
