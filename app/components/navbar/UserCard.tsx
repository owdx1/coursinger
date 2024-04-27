import getSession from '@/app/lib/getSession'
import { signOut } from '@/auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from '@prisma/client'


import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const UserCard = async () => {

  const session = await getSession();

  const user = session?.user


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          alt=''
          src={ user?.image as string || "next.svg" } 
          width={40}
          height={40}
          className='rounded-full'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {user?.name}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings" className='w-full'>
              Settings
            </Link>
          </DropdownMenuItem>
          {user?.role === "admin" && <DropdownMenuItem>
            <Link href="/admin" className='w-full'>
              Admin page
            </Link>
          </DropdownMenuItem>}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <form action={async () => {
              "use server"
              await signOut({
                redirectTo: "/"
              });
            }}>
              <button type="submit" className='w-full flex text-red-400'>
                sign out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



export default UserCard