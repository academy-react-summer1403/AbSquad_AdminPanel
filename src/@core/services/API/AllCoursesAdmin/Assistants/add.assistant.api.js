import http from "../../../Interceptor";
export const AddAssistantApi = async (techs = "") => {
  try {
    const res = await http.post(`/CourseAssistance`, techs);
    return res;
  } catch (error) {
    console.log(error);
  }
};
