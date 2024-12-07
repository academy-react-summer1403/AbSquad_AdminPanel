import http from "../../../Interceptor";
export const EditAssistantApi = async (techs = "") => {
  try {
    const res = await http.put(`/CourseAssistance`, techs);
    return res;
  } catch (error) {
    console.log(error);
  }
};
