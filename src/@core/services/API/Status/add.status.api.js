import http from "../../Interceptor";
export const AddStatusApi = async (data = "") => {
  try {
    const res = await http.post(`/Status`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
export default AddStatusApi;
