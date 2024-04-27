import axios from 'axios';
import { Metadata } from 'next';
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};


const layout = async ({children} : Props) => {


  await getCourses()

  return (
    <div>
      {children}
    </div>
  )
}

async function getCourses(){
  const response = axios.get("/api/course/getCourses")
    .then((response) => {
      const data = response.data
      console.log(data)

    })
    .catch(() => {
      console.log("error")
    })
    .finally(() => {
      console.log("final")
    })

}

export default layout