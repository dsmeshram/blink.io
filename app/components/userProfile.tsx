"use client"

import { Button, Card, CardBody, CardFooter, CardHeader, Image, User } from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



const UserProfile = () => {
    const { data: session } = useSession()
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    function onSignin() {
        setIsSubmitting(true)
        const postDate = async () => {
            const data = {
                user_name: session?.user?.name,
                user_email: session?.user?.email,
            }

            const response = await fetch("/api/signin/", {
                method: "POST",
                body: JSON.stringify(data)
            })

            return response.json()
        };

        postDate().then((data) => {
            setIsSubmitting(false)
            if (data.status == 200) {
                localStorage.setItem("Authorization", data.token);
                router.push("/home");
            }
            else {
                alert("technical error please again later")
            }
        })
    }
    return (

        <Card
        isFooterBlurred
        radius="lg"
        className="border-none"
      >
        <Image
          alt={session?.user?.name || 'user profile'}
          className="object-cover"
          height={200}
          src={session?.user?.image as string}
          width={200}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">{session?.user?.email}</p>
        </CardFooter>
      </Card>
    )
}

export default UserProfile
