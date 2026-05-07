import axios from "axios";
import { BASE_URL } from "./RejectState.api";

export interface ComplaintDetails {
  id: number;
  userId: string;
  userName: string;
  userRole: string;
  orderId: number;
  title: string;
  description: string;
  response: string | null;
  status: string;
  createdAt: string;
  phoneNumber: string | null;
}

export const GetComplaintById = async (
  id: number | string,
): Promise<ComplaintDetails> => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `${BASE_URL}api/Complaints/GetComplaintDetails`,
    {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    },
  );
  return data;
};
