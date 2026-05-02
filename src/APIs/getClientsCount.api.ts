import axios from "axios";
import { BASE_URL } from "../../constants";

export const getClientsCount = async () => {
  const token = localStorage.getItem("token"); 
  const { data } = await axios.get(
    `${BASE_URL}api/Admin/CountClients`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};


