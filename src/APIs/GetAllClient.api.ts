import axios from "axios";

export const GetAllClient = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    "https://herafy.runasp.net/api/Admin/GetAllClient",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};
