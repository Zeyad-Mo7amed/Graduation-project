import axios from "axios";
import { BASE_URL } from "./../../constants";

export const fetchFraudOrders = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `${BASE_URL}/api/Review/GetCountApproved`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  console.log(data);
  
  return data;
};
