import http from "../../../../services/Interceptor";
export const AddUserApi = async (data = "") => {
  try {
    const res = await http.post(`/User/CreateUser`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
