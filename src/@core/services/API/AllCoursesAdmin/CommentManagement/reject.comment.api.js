import http from "../../../Interceptor";
export const RejectCourseCommentApi = async (parameters = {}) => {
  try {
    const res = await http.post(
      `/Course/RejectCourseComment?CommentCourseId=${parameters}`,
      {
        params: parameters,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
