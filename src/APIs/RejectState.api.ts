import axios from "axios";

// الـ BASE_URL اللي انت بعته
export const BASE_URL = "https://herafy.runasp.net/";

interface SendMessagePayload {
  phoneNumber: string;
  messsage: string;
}

export const SendRejectMessage = async (payload: SendMessagePayload) => {
  const token = localStorage.getItem("token");

  // لاحظ هنا شيلنا الـ / اللي قبل api عشان الـ BASE_URL اخره / فعلاً
  const response = await axios.post(
    `${BASE_URL}api/Admin/RejectState`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
