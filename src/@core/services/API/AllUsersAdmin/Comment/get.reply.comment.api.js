import http from "../../../../services/Interceptor";
export const GetReplyComments = async (parameters = "") => {
  try {
    const res = await http.get(
      `/Course/GetCourseReplyCommnets/${parameters.courseId}/${parameters.commentId}`
    );
    console.log(res);
    return res;
  } catch (error) {}
};
