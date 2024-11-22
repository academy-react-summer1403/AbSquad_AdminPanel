import http from "../../../Interceptor";
export const AcceptReserve = async (params = "") => {
  try {
    console.log(params);
    const res = await http.put("/CourseReserve/SendReserveToCourse", params);
    return res;
  } catch (error) {
    console.log(error);
  }
};
