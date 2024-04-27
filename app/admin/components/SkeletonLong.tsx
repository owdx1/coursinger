import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

const SkeletonLong = (props: Props) => {
  return (
    <div className='flex flex-col gap-4 px-4'>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
      <Skeleton className='h-6 w-full'/>
    </div>
  )
}

export default SkeletonLong