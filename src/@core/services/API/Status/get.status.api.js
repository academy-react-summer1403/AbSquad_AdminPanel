import http from "../../Interceptor";
export const GetStatusApi = async () => {
  try {
    const res = await http.get(`/Status`);
    return res;
  } catch (error) {}
};
export default GetStatusApi;
