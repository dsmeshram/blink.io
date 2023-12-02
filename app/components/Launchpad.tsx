"use client"

import React from 'react'
import GitHubSignIn from './GitHubSignIn';
import GoogleSignIn from './GoogleSignIn';
import { useSession } from 'next-auth/react';
import UserProfile from './userProfile';
export const Launchpad = () => {

  const { data: session } = useSession()
  if (session) {
    return (
        <UserProfile></UserProfile>
    )
  } else {
    return (
      <div className='items-center space-x-4 inline-flex'>
        <GoogleSignIn></GoogleSignIn>
        <GitHubSignIn></GitHubSignIn>
      </div>
    )
  }

}
