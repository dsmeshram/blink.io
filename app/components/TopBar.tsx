'use client'

import React from 'react'
import { Avatar,  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tab, Tabs } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const TopBar = (prop : any) => {
    const router = useRouter();
    const { data: session } = useSession()
  
    function logout() {
      signOut();
      router.push("/")
      router.refresh()
    }

    function change(type : string){
        setSelected(type)
        prop.onselectionchage(type)
    }
  
    const [selected, setSelected] = React.useState<any>("EVENTS");
  return (
    <div className='flex  justify-between shadow-md h-14 items-center  p-4 bg-slate-50 rounded-md'>
        <div className='flex gap-4 w-full text-center items-center'>
          <h1 className='font-extrabold text-2xl'>Blink</h1>
          <div className='w-full text-center items-center justify-center pt-1'>
            <div className='gap-8 flex w-full text-center items-center justify-center'>
              <Tabs key="light" color="secondary" variant="light" aria-label="Tabs variants" selectedKey={selected}
                onSelectionChange={(key : any)=>{change(key)}}>
                <Tab key="EVENTS" title="Events"  />
                <Tab key="APPS" title="Applications"/>
                <Tab key="SETTINGS" title="Settings"  />
              </Tabs>
            </div>
          </div>
        </div>
        <div className='justify-end'>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                radius="sm"
                size='sm'
                isBordered
                as="button"
                className="transition-transform"
                src={session?.user?.image || ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">

              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

      </div>
  )
}

export default TopBar