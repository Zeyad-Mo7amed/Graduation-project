import axios from "axios";

export const getCountTechnicians = async () => {
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

  console.log("data", data);
  return data;
};
