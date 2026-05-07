import axios from "axios";
import { BASE_URL } from "./RejectState.api";

export const ApprovedReview = async (reviewId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${BASE_URL}api/Review/ApprovedReview`,
    {}, 
    {
      params: {
        ReviewId: reviewId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
