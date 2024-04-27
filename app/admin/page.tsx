import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import getSession from '../lib/getSession'
import AdminPageComponent from './components/AdminPageComponent'


const AdminPage = async () => {

  const session = await getSession();
  const user = session?.user
 
  if(!user) {
    redirect(`api/auth/signin?callbacks=/admin`)
  }

  if(user.role !== "admin") {
    redirect(`/`)
  }

  return (
    <AdminPageComponent />
  )
}



export default AdminPage