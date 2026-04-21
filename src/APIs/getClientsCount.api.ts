import axios from "axios";

export const getClientsCount = async () => {
  const token = localStorage.getItem("token"); 
  const { data } = await axios.get(
    "https://herafy.runasp.net/api/Admin/CountClients",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  return data;
};

