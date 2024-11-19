import http from "../../../Interceptor";
export const addCourseTechnology = async (courseId = "", techs = "") => {
  try {
    const res = await http.post(
      `/Course/AddCourseTechnology?courseId=${courseId}`,
      techs
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
