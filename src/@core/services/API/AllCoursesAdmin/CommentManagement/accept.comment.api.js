import http from "../../../Interceptor";
export const AcceptCourseCommentApi = async (parameters = {}) => {
  try {
    const res = await http.post(
      `/Course/AcceptCourseComment?CommentCourseId=${parameters}`,
      {
        params: parameters,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
