import axios from "axios";
import { BASE_URL } from "../../constants";

export const getCountTechnicians = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `${BASE_URL}api/Admin/CountTechnicians`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  console.log("data", data);
  return data;
};
