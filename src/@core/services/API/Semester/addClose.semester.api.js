import http from "../../../services/Interceptor";
export const AddTermClose = async (data = "") => {
  try {
    const res = await http.post(`/Term/AddTermCloseDate`, data);

    return res;
  } catch (error) {}
};
export default AddTermClose;
