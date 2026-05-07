import axios from "axios";
import { BASE_URL } from "../../constants";

export const GetClientOrders = async (clientId: string, state: number = 0) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      // تم مسح المتغيرات من مسار الـ URL
      `${BASE_URL}api/Order/GetClientOrders`,
      {
        params: {
          clientId: clientId, // سيتم إرسالها كـ ?clientId=xxx
          state: state, // سيتم إرسالها كـ &state=xxx
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching client orders:", error);
    throw error;
  }
};
