"use client"

import React, { useEffect } from 'react'
import GitHubSignIn from './GitHubSignIn';
import GoogleSignIn from './GoogleSignIn';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export const Launchpad = () => {

  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session?.expires === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  if (session) {
    router.push("/onboarding");
  } else {
    return (
      <div className='items-center space-x-4 inline-flex p-4'>
        <GoogleSignIn></GoogleSignIn>
        <GitHubSignIn></GitHubSignIn>
      </div>
    )
  }

}
