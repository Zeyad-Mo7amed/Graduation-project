import axios from "axios";
import { BASE_URL } from "../../constants";

export const getAllTechnicians = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `${BASE_URL}api/Admin/GetAllTechnicians`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};
