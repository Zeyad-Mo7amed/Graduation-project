import axios from "axios";
import { BASE_URL } from "../../constants";

export const toggleTechnicianStatus = async (id: string, state: number) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.patch(
    `${BASE_URL}api/Admin/ChangeStateTechnician`,
    null, 
    {
      params: {
        id: id, 
        state: state,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
