import http from "../../../services/Interceptor";
export const GetDashboardTechReport = async () => {
  try {
    const res = await http.get(`/Report/DashboardTechnologyReport
`);
    return res;
  } catch (error) {}
};
