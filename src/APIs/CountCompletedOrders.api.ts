import axios from "axios";
import { BASE_URL } from "./RejectState.api";

export const CountCompletedOrders = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${BASE_URL}api/Order/CountCompletedOrders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error counting completed orders:", error);
    throw error;
  }
};
