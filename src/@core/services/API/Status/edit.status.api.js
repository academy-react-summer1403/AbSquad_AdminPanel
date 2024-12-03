import http from "../../Interceptor";
export const EditStatusApi = async (data = "") => {
  try {
    const res = await http.put(`/Status`, data);
    console.log(res);
    return res;
  } catch (error) {}
};
export default EditStatusApi;
