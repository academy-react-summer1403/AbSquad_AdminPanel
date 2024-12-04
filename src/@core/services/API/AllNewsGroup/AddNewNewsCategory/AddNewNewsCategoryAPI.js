import http from "../../../Interceptor";
export const AddNewNewsCategoryAPI = async (formDatas = "") => {
  try {
    const res = await http.post("/News/CreateNewsCategory", formDatas);
    return res;
  } catch (error) {}
};
