import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL: baseUrl,
});
const onSuccess = (response) => {
  if (response.data) {
    return response.data;
  }
};
const onError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    return Promise.reject(error.response.data);
  } else {
    console.error("Error:", error.message);
    return Promise.reject({ error: error.message });
  }
};
instance.interceptors.response.use(onSuccess, onError);
instance.interceptors.request.use((opt) => {
  const token = localStorage.getItem("token");
  opt.headers.Authorization = "Bearer " + token;
  return opt;
});
export default instance;
