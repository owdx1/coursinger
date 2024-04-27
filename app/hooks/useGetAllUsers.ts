import axios from "axios";

export default async function useGetAllUsers(){

  const response = await axios.post("/api/users/getAllUsers")

  console.log(response.data)

  return response.data

}