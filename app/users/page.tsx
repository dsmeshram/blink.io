'use client'

import React from 'react'
import UserEvents from '../components/UserEvents'
import UserApplicationspage from '../applications/page'
import UserSettingpage from '../settings/page'
import TopBar from '../components/TopBar'

const UserPage = () => {
  const [selected, setSelected] = React.useState<any>("EVENTS");

  function onselectionchage(type : string){
    setSelected(type)
  }
  return (
    <div className="flex w-full flex-col  pl-80 pr-80 pt-4 h-screen ">

      <TopBar onselectionchage={onselectionchage}/>
      {selected == "EVENTS" && <UserEvents />}
      {selected == "APPS" && <UserApplicationspage />}
      {selected == "SETTINGS" && <UserSettingpage />}
    </div>
  )
}

export default UserPage