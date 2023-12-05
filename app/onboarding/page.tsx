'use client'

import React from 'react'
import {Card, CardHeader, CardBody, Image, Button, CardFooter, User, Checkbox} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import type1 from "../images/1.png"
import type2 from "../images/2.png"
import type3 from "../images/3.png"

const OnBoardingPage = () => {
    const { data: session } = useSession()
    const router = useRouter();

    const [type, setType] = React.useState(2); 
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
    <div className='p-40  gap-4  justify-center xl:grid-cols-3 flex sm:grid-cols-1'>
    <Card className="py-4">
    <Checkbox className='pl-4 pt-4' isSelected={type == 1} onValueChange={()=>setType(1)}></Checkbox>

      <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center items-center">
      <Image
        alt="Woman listing to music"
        className="object-cover  m-5 h-32 justify-center"
        isZoomed
        isBlurred
        height={50}
        src={type1.src}
      />
        <h4 className="font-bold text-large pt-4">For You</h4>

        
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

    
    <Card className="py-4"  >
    <Checkbox className='pl-4 pt-4' isSelected={type == 2} onValueChange={()=>setType(2)}></Checkbox>
      <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center items-center">
      <Image
        alt="Woman listing to music"
        className="object-cover  m-5  text-center h-32 justify-center"
        isZoomed
        isBlurred
        height={50}
        src={type2.src}
      />
        <h4 className="font-bold text-large pt-4">For Your Brand</h4>
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
    <Card className="py-4" >
      <Checkbox className='pl-4 pt-4' isSelected={type == 3} onValueChange={()=>setType(3)}></Checkbox>
      <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center items-center">
      <Image
        alt="Woman listing to music"
        className="object-cover  m-5 h-32 justify-center"
        isZoomed
        isBlurred
        height={50}
        src={type3.src}
      />
        <h4 className="font-bold text-large pt-4">For Your Team</h4>
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

    <Button color='secondary' onClick={()=>router.replace("/users?type"+{type}+"")}> Take me to Blink</Button>

    </div>
    </>
   
  )
}

export default OnBoardingPage