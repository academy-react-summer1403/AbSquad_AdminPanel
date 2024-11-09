import http from "../../../Interceptor";
export const GetCreateApi = async () => {
  try {
    const res = await http.get(`/Course/GetCreate`);
    return res;
  } catch (error) {}
};
