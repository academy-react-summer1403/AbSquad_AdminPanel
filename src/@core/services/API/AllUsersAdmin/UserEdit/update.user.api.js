import http from "../../../../services/Interceptor";
export const UpdateUserApi = async (data = "") => {
  try {
    const res = await http.put(`/User/UpdateUser`, data);
    return res;
  } catch (error) {}
};
