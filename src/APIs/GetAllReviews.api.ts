import axios from "axios";
import { BASE_URL } from "./RejectState.api";
export interface FraudOrder {
  id: number;
  nameClient: string;
  nameTechnician: string;
  rating: number;
  comment: string;
  createdAt: string;
  is_suspicious: boolean;
  confidenceScore: number;
  fraudReasons: string;
}
export const GetFraudOrders = async (): Promise<FraudOrder[]> => {
  // هنجيب التوكن من الـ LocalStorage (أو المكان اللي بتخزنه فيه)
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}api/Review/GetAllReviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};
