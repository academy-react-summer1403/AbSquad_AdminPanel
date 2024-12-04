import http from "../../../Interceptor";
export const SendReplyAPI = async (dataSent = "") => {
  try {
    const res = await http.post("/News/CreateNewsReplyComment", dataSent);
    return res;
  } catch (error) {}
};
