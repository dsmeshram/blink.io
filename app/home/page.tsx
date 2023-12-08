'use client'

import React, { useEffect } from 'react'
import NoEvents from '../components/NoEvents';
import { useRouter } from 'next/navigation';
import TopBar from '../components/TopBar';

interface Events {
  event_name: string
  id: number
  avatar: string
  email: string
  role: string
  event_date: string
  status: string
}
interface Props {
  children: React.ReactNode
}

const HomePage = ({ children }: Props)  => {
  const router = useRouter();

  const [events, setEvents] = React.useState<Events[]>([]);

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
      const events = result?.events;
      if (events?.length != 0){
        // router.replace("/events");
      }else{
        setEvents(events)
      }
    }else{
      setEvents([])
    }
  }

  useEffect(() => {
    get_events()
  }, [])

  return (
   <div>
   <TopBar />
    {children}
   </div>
  )
}

export default HomePage