import { User } from "@prisma/client";
import axios from "axios";
import { usersArrayType } from "./types";
import useGetAllUsers from "./hooks/useGetAllUsers";


async function Fee(){
  const response = await axios.get("/api/try")

  return response.data
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={ async () => {
        "use server"
        const response = await Fee();
        const data = await response.json();
      
        console.log(data)
      }}>
        <button type="submit">
          clik
        </button>
      </form>
    </main>
  );
}
