import axios from "axios";
import { BASE_URL } from "../../constants";

// هنفترض إنك مخزن التوكن باسم "userToken"
export const getTechnicianDetails = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    // 1. نسحب التوكن من الـ localStorage

    const response = await axios.get(
      `${BASE_URL}api/Admin/GetDecumentTechnician`,
      {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching technician details:", error);
    throw error;
  }
};
