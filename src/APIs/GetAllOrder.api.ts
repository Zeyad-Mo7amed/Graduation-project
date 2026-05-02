import axios from "axios";
import { BASE_URL } from "./../../constants";

export const GetAllOrder = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${BASE_URL}api/Order/GetAllOrder`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};
