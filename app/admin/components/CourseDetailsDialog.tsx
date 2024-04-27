"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Course } from '@prisma/client'
import axios from 'axios'
import classNames from 'classnames'
import { error } from 'console'
import { Form, Formik } from 'formik'
import { Code, LoaderIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

interface CourseDetailsDialogProps {
  onOpenChange: Dispatch<SetStateAction<boolean>>
  isDialogOpen: boolean
  course?: Course
  trigger: () => void
  closeDialog: () => void
}

const CourseDetailsDialog: React.FC<CourseDetailsDialogProps> = ({ onOpenChange, isDialogOpen, course, trigger, closeDialog}) => {

  const [isPublic, setIsPublic] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const id = course?.id

  const handleDeleteCourse = (courseId: string) => {
    setIsLoading(true)
    const response = axios.post("/api/course/delete", {
      id: courseId
    })
    .then((response) => {
      if(response.status === 200) {
        toast("successfully deleted!")
        router.refresh();
        trigger()
        
      } else {
        toast.error("something went wrong...")
      }
    })
    .catch((error) => {
      console.log("server error" , error)
    })
    .finally(() => {
      closeDialog()
      setIsLoading(false);
    })

    
  }
  // add min-h-full for fullsize dialog
  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className='w-full h-full'> 
        <Formik
          initialValues={
            {
              password: `${course?.password}`,
              code: `${course?.code}`,
              name: `${course?.name}`,
              description: `${course?.description}`,                
            }
          }
          onSubmit={async (values) => {
            const response = await axios.post("/api/course/update", {
              ...values,
              isPublic,
              id
            })
            if(response.status === 200) {
              router.refresh()
              trigger()
              closeDialog()
              toast("Course updated!");
              

            } else {
              toast("Something went wrong....")
            }
          }}
        >
          {({values, handleChange, handleSubmit, isSubmitting, touched}) => (
            <Form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                <label htmlFor='code'>Code</label>
                <Input
                  name='code'
                  value={values.code}
                  onChange={handleChange}
                  placeholder='.../...'
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
              {!isPublic && 
                <div className='flex flex-col gap-1'>
                  <label htmlFor='password'>password</label>
                  <Input 
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  placeholder='password'
                />
                </div>
              }
              
              <div className='flex gap-2 items-center justify-center'>
                <Popover>
                  <PopoverTrigger>
                    <Button type="button" className='text-red-500 gap-2 p-4 flex items-center justify-center'>
                      <TrashIcon />
                      <p className='text-white'>delete</p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='flex flex-col gap-4'>
                    <p>Do you really want to delete this course?</p>
                    <Button variant="destructive" onClick={() => handleDeleteCourse(course?.id as string)} disabled={isLoading}
                      className={classNames({
                        "flex gap-2": true,
                        "bg-opacity-55": isLoading,
                      })}
                    > 
                      <p>yes</p>
                      {isLoading && <LoaderIcon className='animate-spin'/>}
                    </Button>
                  </PopoverContent> 
                </Popover>    
                
                <Button type="submit" className={classNames({
                  "flex-1": true,
                  "opacity-50 bg-slate-500 gap-4": isSubmitting,
                  
                })}>
                  <p className='text-white'> update </p> 
                  {isSubmitting && <LoaderIcon className='animate-spin'/>}
                </Button>
              </div>
            </Form>
          )}

        </Formik>
      </DialogContent>
  </Dialog>
  )
}

export default CourseDetailsDialog