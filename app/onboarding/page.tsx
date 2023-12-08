"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
   User,
  Checkbox,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import cn from "classnames";

import type1 from "../images/1.png";
import type2 from "../images/2.png";
// import type3 from "../images/3.png"

const OnBoardingPage = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(true);
  const router = useRouter();
  const [type, setType] = React.useState(1);

  async function checkSignIn() {
    const data = {
      user_name: session?.user?.name as string,
    };

    const response = await fetch("/api/signin", {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API's requirements
        Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
    });
    const result = await response.json();

    if (result.status == 200) {
      localStorage.setItem("Authorization", result.token);
      router.replace("/home/events");
    } else {
      toast.success("Technical error please again later", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function onSignin() {
    setIsSubmitting(true);
    const data = {
      user_name: session?.user?.name as string,
      user_email: session?.user?.email as string,
    };

    const response = await fetch("/api/signin/", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.status == 200) {
      localStorage.setItem("Authorization", result.token);
      setIsSubmitting(false)
      router.replace("/home");
    } else {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    setIsSubmitting(true)
    checkSignIn();
  }, []);

  return (
    <>
      { !isSubmitting && <div className="text-center p-4 ">
        <h2 className="font-extrabold text-2xl">
          How are you planning to use Blink?
        </h2>
        <h3>We&lsquo;ll streamline your set up events accordingly</h3>

        <br></br>

        <h3></h3>

        <div className="text-center  justify-center items-center flex p-4">
          <User
            className="shadow-md p-2"
            name={session?.user?.name}
            description={session?.user?.email}
            avatarProps={{
              src: session?.user?.image as string,
            }}
          />
        </div>
        
        <div className="p-40  gap-4  justify-center xl:grid-cols-3 flex sm:grid-cols-1">
          <Card
            className={cn({
              "p-4 w-60 h-80": true,
              "border-small border-blue-500": type == 1,
            })}
            isPressable
            onPress={() => setType(1)}
          >
            <Checkbox
              className="pl-4 pt-4  "
              isSelected={type == 1}
              onValueChange={() => setType(1)}
            ></Checkbox>

            <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center items-center">
              <Image
                alt="Woman listing to music"
                className="object-cover  m-5 h-24 justify-center"
                isZoomed
                isBlurred
                height={50}
                src={type1.src}
              />
              <h4 className="font-bold text-large pt-4">For You</h4>
              <span>Single user, Single Brand Free account</span>
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

          <Card
            className={cn({
              "p-4 w-60 h-80": true,
              "border-small border-blue-500": type == 2,
            })}
            isPressable
            onPress={() => setType(2)}
          >
            <Checkbox
              className="pl-4 pt-4 rounded-full"
              isSelected={type == 2}
              onValueChange={() => setType(2)}
            ></Checkbox>
            <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center items-center">
              <Image
                alt="Woman listing to music"
                className="object-cover  m-5  text-center h-24 justify-center"
                isZoomed
                isBlurred
                height={50}
                src={type2.src}
              />
              <h4 className="font-bold text-large pt-4">For Your Brand</h4>
              <span>
                Multiple user, Multiple Brand More freedom less effort
              </span>
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
          {/* <Card className={cn({
      "p-4" : true,
      "border-large border-blue-500" : type == 3
    })} >
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
    </Card> */}
        </div>
     
        <Button color="secondary" onClick={onSignin}>
          {" "}
          Take me to Blink
        </Button>
      </div>
       }
      <ToastContainer />
      
    </>
  );
};

export default OnBoardingPage;
