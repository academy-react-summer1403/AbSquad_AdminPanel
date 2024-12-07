import axios from "axios";
export const AddNotif = async (data = "") => {
  try {
    const res = await axios.post("http://localhost:8080/notif", data);
    console.log(res);
    return res;
  } catch (error) {}
};
