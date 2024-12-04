import http from "../../../../services/Interceptor";
export const ReplyComment = async (data = "") => {
  try {
    const res = await http.post(`/Course/AddReplyCourseComment`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
