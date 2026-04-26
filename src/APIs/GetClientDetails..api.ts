import axios from "axios";

export const GetClientDetails = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `https://herafy.runasp.net/api/Admin/GetClientDetails`,
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
