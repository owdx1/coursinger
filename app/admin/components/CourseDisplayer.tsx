"use client"
import FormSkeleton from '@/app/settings/components/FormSkeleton'
import { courseArrayType } from '@/app/types'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Course, User } from '@prisma/client'
import axios from 'axios'
import { DeleteIcon, Edit2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseDetailsDialog from './CourseDetailsDialog'
import SkeletonLong from './SkeletonLong'

type Props = {}

const CourseDisplayer = () => {

  const [data, setData] = useState<courseArrayType>([]);

  const [currentCourse, setCurrentCourse] = useState<Course>();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const session = useSession();
  const user = session?.data?.user
  const router = useRouter();

  const handleRowClick = (course: Course) => {
    console.log("clicked!!")
    setCurrentCourse(course);
    setIsDialogOpen(true);
  }

  const closeDialog = () => setIsDialogOpen(false);

  const [fetchCheck, setFetchCheck] = useState(0);
  
  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get("/api/course/getCourses")
      const data = await response.data
      setData(data)
      
    }
    fetchCourses()
  },[fetchCheck])

  if(!user) {
    return (
      <SkeletonLong />
    )
  }
  
  return(
    <div className="w-full flex gap-2 items-center">
      <div className='w-[32rem] flex flex-col items-center justify-center gap-4 p-4'>
        <p className='text-gray-800 text-2xl font-light'>your courses</p>
        <CourseDetailsDialog course={currentCourse} isDialogOpen={isDialogOpen} onOpenChange={setIsDialogOpen} trigger ={() => setFetchCheck((prev) => prev + 1)} closeDialog={closeDialog}/>
        <Table className="border-dashed border-4">
          <TableCaption> your courses </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Code </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data) => (
              <TableRow key={data.id} onClick={() => handleRowClick(data)} className='cursor-pointer'>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell>{data.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CourseDisplayer