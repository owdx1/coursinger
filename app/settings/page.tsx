import React from 'react'
import UpdateSettingsForm from './components/UpdateSettingsForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import getSession from '../lib/getSession'


const SettingsPage = async () => {

  const session = await getSession();
  const user = session?.user;

  if(!user) {
    redirect("/api/auth/signin?callbackUrl=/settings");
  }


  return (
    <div className='w-full h-full flex items-center justify-center'>
      <UpdateSettingsForm />
    </div>
  )
}

export default SettingsPage