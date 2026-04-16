
import axios from "axios";

export async function login(dataForm: any) {
  const { data } = await axios.post(
    `https://herafy.runasp.net/api/Auth/Login`,
    dataForm,
  );
  console.log('dataForm',data);
  
  return data;
}