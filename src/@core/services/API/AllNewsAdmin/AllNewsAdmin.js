import http from "../../../services/Interceptor";
export const GetNewsList = async (searchParams = "") => {
  try {
    const res = await http.get(`/News/AdminNewsFilterList` + searchParams);
    return res;
  } catch (error) {}
};
export default GetNewsList;
