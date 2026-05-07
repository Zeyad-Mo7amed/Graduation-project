import axios from "axios";
import { BASE_URL } from "./RejectState.api";

export const DeleteReview = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${BASE_URL}api/Review/admin/deleteReview`,
    {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
