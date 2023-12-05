'use client'

import React from 'react'
import {Card, CardHeader, CardBody, Image, Button, CardFooter, User} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const OnBoardingPage = () => {
    const { data: session } = useSession()
    const router = useRouter();
  return (
    <>
    <div className='text-center p-4 '>
    <h2 className='font-extrabold text-2xl'>How are you planning to use Blink?</h2>
    <h3>We&lsquo;ll streamline your set up events accordingly</h3>

    <br></br>

    <h3></h3>

    <div className='text-center  justify-center items-center flex p-4'>
             <User
                        name={session?.user?.name}
                        description={session?.user?.email}
                        avatarProps={{
                            src: session?.user?.image as string
                        }}


                    />
      </div>
    <div className='p-60  gap-4 flex justify-center'>
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">For yourself</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>

    
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">For your brand</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">For your team</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>

   
    </div>

    <Button color='secondary' onClick={()=>router.replace("/users")}> Take me to Blink</Button>

    </div>
    </>
   
  )
}

export default OnBoardingPage