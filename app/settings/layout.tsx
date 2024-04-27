
import { auth } from '@/auth';
import { Metadata } from 'next';
import React from 'react'
import getSession from '../lib/getSession';

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings Page"
}


const SettingsLayout = async ({children} : Props) => {
  return (
    <div className='w-full h-full'>
      {children}
    </div>
  )
}

export default SettingsLayout