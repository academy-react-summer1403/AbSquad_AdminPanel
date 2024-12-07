import http from "../../../services/Interceptor";
export const AddColorPallete = async (data = "") => {
  try {
    const res = await http.post(`/SiteSetting/AddColorPalet`, { params: data });
    console.log(res);
    return res;
  } catch (error) {}
};
export default AddColorPallete;
