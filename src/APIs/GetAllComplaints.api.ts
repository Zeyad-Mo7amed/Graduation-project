import axios from "axios";
import { BASE_URL } from "../../constants";

export interface OrderResponse {
  id: number;
  userId: string;
  userName: string;
  userRole: string;
  orderId: number;
  title: string;
  response: string;
  createdAt: string;
  status: number;
}

export const GetAllComplaints = async (): Promise<OrderResponse[]> => {
  const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}api/Complaints/GetAllComplaints`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    return response.data;
};
