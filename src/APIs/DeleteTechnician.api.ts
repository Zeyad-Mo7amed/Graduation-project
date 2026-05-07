import axios from "axios";
import { BASE_URL } from "../../constants";

export const deleteTechnician = async (id: string) => {
  const token = localStorage.getItem("token"); 

  const response = await axios.delete(`${BASE_URL}api/Admin/DeleteTechnician`, {
    params: { id: id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
