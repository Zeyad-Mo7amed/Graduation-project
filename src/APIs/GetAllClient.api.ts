import axios from "axios";
import { BASE_URL } from './../../constants';

export const GetAllClient = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `${BASE_URL}api/Admin/GetAllClient`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};
