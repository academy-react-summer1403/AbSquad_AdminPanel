import http from "../../../Interceptor";
export const AddGroupApi = async (techs = "") => {
  try {
    const res = await http.post(`/CourseGroup`, techs);
    return res;
  } catch (error) {
    console.log(error);
  }
};
