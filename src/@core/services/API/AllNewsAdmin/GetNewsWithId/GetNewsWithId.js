import http from "../../../Interceptor";
export const GetNewsWithID = async (id = "") => {
  try {
    const res = await http.get("/News/" + id);
    return res;
  } catch (error) {}
};
