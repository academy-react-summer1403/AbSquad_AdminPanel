import http from "../../../Interceptor";
export const CreateNewNews = async (formDatas = "") => {
  try {
    const res = await http.post("/News/CreateNews", formDatas);
    return res;
  } catch (error) {}
};
