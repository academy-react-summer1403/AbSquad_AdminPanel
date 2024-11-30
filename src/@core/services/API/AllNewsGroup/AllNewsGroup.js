import http from "../../../services/Interceptor";
export const AllNewsGroup = async (searchParams = "") => {
  try {
    const res = await http.get(`/News/GetListNewsCategory` + searchParams);
    return res;
  } catch (error) {}
};
