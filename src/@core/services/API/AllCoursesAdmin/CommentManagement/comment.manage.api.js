import http from "../../../Interceptor";
export const CourseCommentManagementApi = async (parameters = {}) => {
  try {
    const res = await http.get("/Course/CommentManagment", {
      params: parameters,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
