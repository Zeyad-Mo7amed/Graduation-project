import axios from "axios";
import { BASE_URL } from "../../constants";

export const GetDetailsOrder = async (id: string | number) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${BASE_URL}api/Order/GetDetailsOrderAdmin/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
