"use client"

import React, { useEffect } from 'react'
import GitHubSignIn from './GitHubSignIn';
import GoogleSignIn from './GoogleSignIn';
import { signIn, useSession } from 'next-auth/react';
import UserProfile from './userProfile';
export const Launchpad = () => {

  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

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
