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
    <div className="xl:pl-80 xl:pr-80 h-96  xl:pt-4 xl:pb-4 bg-image sm:pl-40 sm:pr-40 sm:pt-4 sm:pb-4">

      <TopBar onselectionchage={onselectionchage}/>
      {selected == "EVENTS" && <UserEvents />}
      {selected == "APPS" && <UserApplicationspage />}
      {selected == "SETTINGS" && <UserSettingpage />}
    </div>
  )
}

export default UserPage