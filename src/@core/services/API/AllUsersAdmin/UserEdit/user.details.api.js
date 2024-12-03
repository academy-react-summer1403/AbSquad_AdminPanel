import http from "../../../../services/Interceptor";
export const GetUserDetail = async (userId = "") => {
  try {
    const res = await http.get(`/User/UserDetails/${userId}`);
    return res;
  } catch (error) {}
};
