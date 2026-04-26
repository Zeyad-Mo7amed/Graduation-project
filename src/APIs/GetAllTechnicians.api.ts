import axios from "axios";

export const getAllTechnicians = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    "https://herafy.runasp.net/api/Admin/GetAllTechnicians",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};
