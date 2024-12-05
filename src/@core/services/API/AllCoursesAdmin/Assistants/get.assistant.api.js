import http from "../../../Interceptor";
export const GetAssistantApi = async () => {
  try {
    const res = await http.get(`/CourseAssistance`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
