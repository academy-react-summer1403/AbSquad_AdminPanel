import http from "../../../services/Interceptor";

export const GetProfileInfo = async () => {
  try {
    const res = await http.get(`/SharePanel/GetProfileInfo`);
    return res;
  } catch (error) {
    console.error("Error in GetProfileInfo:", error);
  }
};
