
import axios from "axios";
import { BASE_URL } from "../../constants";

export async function login(dataForm: any) {
  const { data } = await axios.post(
    `${BASE_URL}api/Auth/Login`,
    dataForm,
  );
  console.log('dataForm',data);
  
  return data;
}