'use client'

import React, { useEffect } from 'react'
import { Avatar, Button, Input, Listbox, ListboxItem, Snippet } from "@nextui-org/react";
import { signIn } from 'next-auth/react';


interface App {
  app_name: string
  avatar: string
  id: string
}

interface Apps {
  id: string
  app: App
}


const UserApplicationspage = () => {

  const [apps, setApps] = React.useState<Apps[]>([]);
  const [selectedApp, setApp] = React.useState<App>();


  async function onconnect() {
    signIn("linkedin")
  }

  async function get_user_apps() {
    const response = await fetch('/api/userapps', {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
        'Authorization': localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }


    const result = await response.json();

    if (result.status == 201) {
      setApps(result.data)
      setApp(result.data[0].app)
    } else {
      setApps([])
    }

  }

  function select_item(id: string) {
    apps.map((item: any) => {
      if (item.app.id == id) {
        setApp(item.app)
        console.log("selected", item.app)
      }
    })
  }

  useEffect(() => {
    get_user_apps()
  }, [])

  return (
    <div className='p-4 flex gap-4'>
      <div className='w-60 '>
        <Listbox
          items={apps}
          aria-label="Dynamic Actions"
          onAction={(key) => select_item(key as string)}
        >
          {(item) => (
            <ListboxItem
              key={item.app.id}
            >
              <div className="flex gap-2 items-center">
                <Avatar alt={item.app.app_name} className="flex-shrink-0" size="sm" src={item.app.avatar} />
                <div className="flex flex-col">
                  <span className="text-small">{item.app.app_name}</span>
                  <span className="text-tiny text-default-400">{item.app.id}</span>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </div>

      <div className='w-full flex flex-col gap-4 p-4 border h-auto'>
        <p className='font-bold'>{selectedApp?.app_name}</p>
        <Input type='text' placeholder='Client ID' className='w-60'></Input>
        <Input type='password' placeholder='Client Secret'  className='w-60'></Input>
        <Button color='secondary' onClick={onconnect}  className='w-60'> Connect </Button>
      </div>
    </div>
  )
}

export default UserApplicationspage