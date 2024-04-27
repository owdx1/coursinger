"use client"
import { User } from '@prisma/client'
import React from 'react'
import { Form, Formik } from "formik"
import { Input } from '@/components/ui/input'
import prisma from '@/app/lib/db'
import axios from "axios"
import { toast } from 'sonner'
import classnames from "classnames"
import { useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import FormSkeleton from './FormSkeleton'


const UpdateSettingsForm = () => {

  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  if(!user) {
    return (
      <FormSkeleton />
    )
  }

  return (
    <Formik
      initialValues={
        {
          name: `${user.name || "name-not-found"}`,
          email: `${user.email || "email-not found"}`
        }
      }
      onSubmit={async (values, actions) => {
        const response = await axios.post("/api/update", values);
        if(response.status === 200) {
          router.refresh()
          return toast("Updated successfully!");
          
        } 
        return toast("Something went wrong...")
      
      }}
    >
      {({handleChange, values, handleSubmit, isSubmitting}) => (
        <Form onSubmit={handleSubmit} className='w-96 flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
          <label htmlFor='email'>email</label>
          <Input
            name='email'
            value={values.email}
            disabled
            type="email"
          />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>name</label>
            <Input
              name='name'
              value={values.name}
              onChange={handleChange}
              placeholder='enter a username...'
            />
          </div>

          <button type="submit" className={classnames({
            'w-full p-4 bg-gray-800 text-white text-light font-medium hover:bg-gray-600 transition rounded-lg flex gap-4 items-center justify-center': true,
            "bg-opacity-80 cursor-pointer disabled": isSubmitting
          })}>
            Save settings
            {isSubmitting && <LoaderIcon className='animate-spin' />}
          </button>

        </Form>
      )}
    </Formik>
  )
}

export default UpdateSettingsForm