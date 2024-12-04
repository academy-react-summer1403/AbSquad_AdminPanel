import http from "../../../services/Interceptor";
export const GetDashboardReport = async () => {
  try {
    const res = await http.get(`/Report/DashboardReport`);
    return res;
  } catch (error) {}
};
