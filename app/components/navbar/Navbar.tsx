import { auth, signIn, signOut } from '@/auth'
import { Session } from '@prisma/client'
import React from 'react'
import UserCard from './UserCard'
import Link from 'next/link'
import getSession from '@/app/lib/getSession'


const Navbar = async () => {

  const session = await getSession()
  const user = session?.user

  return (
    <nav className='w-full h-24 px-20 border-b-2 flex items-center justify-between'>
      <Link href="/">
        logo
      </Link>
      <div>
        {user ?  <UserCard /> : <SignInButton />}
      </div>
    </nav>
  )
}

function SignInButton() {
  return(
    <form action={async () => {
      "use server"
      await signIn()
    }}>
      <button type="submit">
        Sign In
      </button>
    </form>
  )
}

export default Navbar