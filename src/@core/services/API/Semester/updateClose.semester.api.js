import http from "../../../services/Interceptor";
export const UpdateTermClose = async (data = "") => {
  try {
    const res = await http.put(`/Term/UpdateTermCloseDate`, data);

    return res;
  } catch (error) {}
};
export default UpdateTermClose;
