"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import classNames from 'classnames'
import { Form, Formik } from 'formik'
import { LoaderIcon, LucideAccessibility } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {}

const AddCourseForm = (props: Props) => {

  const [isPublic, setIsPublic] = useState(true)
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger className="p-4 flex gap-2 bg-slate-800 rounded-lg text-white hover:bg-slate-600 transition">
        <LucideAccessibility />
        <p>add course</p>
      </DialogTrigger>
      <DialogContent className='p-10'>
        <DialogHeader className='text-2xl'>
          Add new course
        </DialogHeader>
        <div>
          <Formik
            initialValues={
              {
                password: '',
                code: '',
                name: '',
                description: '',                
              }
            }
            onSubmit={async (values) => {
              const response = await axios.post("/api/course/createCourse", {
                ...values,
                isPublic
              })
              if(response.status === 200) {
                router.refresh()
                toast("Course added!");

              } else {
                toast("Something went wrong....")
              }
            }}
          >
            {({values, handleChange, handleSubmit, isSubmitting}) => (
              <Form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='code'>Code</label>
                  <Input
                    name='code'
                    value={values.code}
                    onChange={handleChange}
                    placeholder='.../...'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='name'>name</label>
                  <Input
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    placeholder='name...'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='description'>description</label>
                  <Textarea
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    placeholder='about this course...'
                  />
                </div>
                <div className='flex gap-3'>
                <Switch onCheckedChange={setIsPublic} checked={isPublic}/>
                  <label htmlFor='public'>is it going to be publicly available?</label>
                </div>
                {!isPublic && <Input 
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  placeholder='password'
                
                />}
                
                <div className='flex flex-col gap-2'>
                  
                  <Button type="submit" className={classNames({
                    "opacity-50 bg-slate-500 gap-4": isSubmitting
                  })}>
                    create course
                    {isSubmitting && <LoaderIcon className='animate-spin'/>}
                  </Button>
                </div>
              </Form>
            )}

          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCourseForm