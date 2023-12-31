"use client"

import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { Button } from '@nextui-org/react';
const GoogleSignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  function onclick_g() {
    setIsSubmitting(true)
    signIn("google")
  }

  return (

    isSubmitting === true ? (
      <Button isLoading 
        type="button" onClick={onclick_g}
        className=" flex items-center hover:bg-gray-300 text-white font-normal hover:border-transparent roundedpr-4 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-red-600 p-2"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        {!isSubmitting ? ('Sign with google') : ('Loading...')}
      </Button>
    ) : (
      <Button 
        type="button" onClick={onclick_g}
        className="flex items-center bg-slate-400  hover:bg-gray-500 text-white font-normal hover:border-transparent rounded pr-4 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-red-600 p-2"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        {!isSubmitting ? ('Sign with google') : ('Loading...')}
      </Button>
    )
  )
}

export default GoogleSignIn