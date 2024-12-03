import http from "../../../services/Interceptor";
export const DeleteUserApi = async (data = "") => {
  try {
    const res = await http.delete("/User/DeleteUser", { data: data });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
