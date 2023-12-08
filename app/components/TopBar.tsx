'use client'

import React, { useEffect } from 'react'
import { User,  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tab, Tabs, image } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { CubeIcon, Square3Stack3DIcon, WalletIcon } from '@heroicons/react/24/outline';

const TopBar = (prop : any) => {
    const router = useRouter();
    const { data: session } = useSession()

    var img = session?.user?.image as string
  
    function logout() {
      signOut({ callbackUrl: '/' })
    }

    function change(type : string){
        setSelected(type)
        if (type === "EVENTS"){
          router.push("events")
        }else if (type === "APPS"){
          router.push("applications")
        }else if (type === "SETTINGS"){
          router.push("settings")
        }
    }
  
    const [selected, setSelected] = React.useState<any>("EVENTS");

    useEffect(() => {
    img = session?.user?.image as string
    },[])
  return (
    <div className='flex  justify-between shadow-md h-14 items-center  p-4 bg-slate-50 rounded-md'>
        <div className='flex gap-4 w-full text-center items-center'>
          <h1 className='font-extrabold text-2xl'>Blink</h1>
          <div className='w-full text-center items-center justify-center pt-1'>
            <div className='gap-8 flex w-full text-center items-center justify-center'>
              <Tabs key="light" color="secondary" variant="light" aria-label="Tabs variants" selectedKey={selected}
                onSelectionChange={(key : any)=>{change(key)}}>
                <Tab key="EVENTS" 
                 title={
                  <div className="flex items-center space-x-2">
                    <CubeIcon className='h-4 w-4'/>
                    <span>EVENTS</span>
                  </div>
                }  />
                <Tab key="APPS"  title={
                  <div className="flex items-center space-x-2">
                    <Square3Stack3DIcon className='h-4 w-4'/>
                    <span>APPLICATIONS</span>
                  </div>
                } />
                <Tab key="SETTINGS" title={
                  <div className="flex items-center space-x-2">
                    <WalletIcon className='h-4 w-4'/>
                    <span>DATA</span>
                  </div>
                } />
              </Tabs>
            </div>
          </div>
        </div>
        <div className='justify-end'>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
            <User
            as="button"
            avatarProps={{
              src:""
            }}
            className="transition-transform"
            description={session?.user?.email || ""}
            name={session?.user?.name || ""}
          />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">

            <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session?.user?.email}</p>
          </DropdownItem>

          <DropdownItem key="settings">
            My Settings
          </DropdownItem>

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