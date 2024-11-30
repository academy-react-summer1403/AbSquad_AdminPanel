import http from "../../../Interceptor";
export const AcceptReserve = async (params = "") => {
  try {
    console.log(params);
    const res = await http.post("/CourseReserve/SendReserveToCourse", params);
    return res;
  } catch (error) {
    console.log(error);
  }
};
