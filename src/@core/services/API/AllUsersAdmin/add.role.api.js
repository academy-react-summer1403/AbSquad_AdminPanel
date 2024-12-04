import http from "../../../services/Interceptor";
export const AddRoleApi = async (bool = "", data = "") => {
  try {
    const res = await http.post(`/User/AddUserAccess?Enable=${bool}`, data);
    return res;
  } catch (error) {}
};
