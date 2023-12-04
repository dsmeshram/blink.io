'use client'
import React, { useEffect, useState } from 'react'
import AddEvent from './AddEvent'
import EventsTable from './EventsTable'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import EventPage from '../events/page'

interface Events {
  event_name: string
  id: number
  avatar: string
  email: string
  role: string
  event_date: string
  status: string
}


const UserEvents = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [events, setEvents] = React.useState<Events[]>([]);

  const [selectedevent, setSelectedEvent] = React.useState<Event>();

  function add_new_event() {
    onOpen()
  }

  function event_Save() {
    onClose()
  }

  async function onSuccess() {
    onClose()
    get_events()
  }

  function onViewEvent(event_id: any){
    const event = null
    events.map((e : any)=>{
      if (e.event.id === event_id){
        setSelectedEvent(e)
      }
    })
    onOpen()
  }


  function onDeleteEvent(event_id: any){
    toggle_events(true,event_id)
  }

  useEffect(() => {
    get_events()
  }, [])

  async function get_events() {
    const response = await fetch('/api/userevents', {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
        'Authorization': localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
    });
    const result = await response.json();
    if (result.status == 201) {
      const events = result?.events
      setEvents(events)
    }
  }


  async function toggle_events(flag : Boolean, event_id: String) {
    const response = await fetch('/api/userevents', {
      method: 'DELETE', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
        'Authorization': localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
      body : JSON.stringify({"flag": flag, "event-id": event_id})
    });
    const result = await response.json();
    if (result.status == 200) {
      console.log(result)
      get_events()
    }
  }


  return (
    <div className=''>
      <br></br>
      <br></br>
      <div className='w-full flex pt-4 gap-4 justify-between items-center'>
        <h2 className='font-extrabold'>Events</h2>
        <div className='justify-end flex'>
          <AddEvent add_new_event={add_new_event}></AddEvent>
        </div>
      </div>
      <EventsTable events={events} onViewEvent={(e :any)=>onViewEvent(e)} onDeleteEvent={(e :any)=>onDeleteEvent(e)}></EventsTable>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Event
              </ModalHeader>
              <ModalBody>
                <EventPage  selectedevent={selectedevent} event_Save={event_Save} onSuccess={onSuccess}></EventPage>
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UserEvents