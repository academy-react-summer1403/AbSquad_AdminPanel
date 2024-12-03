import http from "../../../services/Interceptor";
export const GetUserManageList = async (parameters = "") => {
  try {
    const res = await http.get(`/User/UserMannage`, { params: parameters });
    return res;
  } catch (error) {}
};
