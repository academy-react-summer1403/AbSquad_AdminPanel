import http from "../../../Interceptor";
export const GetTeachers = async () => {
  try {
    const res = await http.get(`/Home/GetTeachers`);
    return res;
  } catch (error) {}
};
