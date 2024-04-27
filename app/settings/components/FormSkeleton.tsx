import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

const FormSkeleton = (props: Props) => {
  return (
    <div className='flex flex-col gap-3 w-full h-full items-center justify-center'>
      <Skeleton className='h-12 w-96'/>
      <Skeleton className='h-12 w-96'/>
      <Skeleton className='h-12 w-96'/>
    </div>
  )
}

export default FormSkeleton