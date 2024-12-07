import axios from "axios";
export const AddChapterApi = async (data = "") => {
  try {
    const res = await axios.post("http://localhost:8080/chapters", data);
    console.log(res);
    return res;
  } catch (error) {}
};
