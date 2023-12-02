"use client"


import { PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddEvent = (add_new_event : any) => {
  const router = useRouter()

  function ev_add_new_event(){
    add_new_event.add_new_event()
  }

  return (
    <Button color='secondary' onClick={ev_add_new_event}  endContent={<PlusIcon className='h-4 w-4'/>}>New Event</Button>
  )
}

export default AddEvent