import React from 'react'
import AddCourseForm from './AddCourseForm'
import CourseDisplayer from './CourseDisplayer'

type Props = {}

const AdminPageComponent = async (props: Props) => {
  
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-24 gap-2 flex flex-col items-center justify-center p-4'>
        <p className='text-2xl font-light'>Welcome to admin dashboard!</p>
        <p className="font-mediumtext-gray-300">you can add courses or change the content of courses</p>
      </div>
      <div className='p-4'>
        <AddCourseForm />
      </div>
      <CourseDisplayer />
    </div>
  )
}

export default AdminPageComponent