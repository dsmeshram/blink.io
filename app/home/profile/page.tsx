"use client";

import { Avatar, Snippet,Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  useEffect(() => {}, []);

  return (
    <div className="h-full">
      <p className="pt-8 pb-8 pl-60 pr-60 border-b-1 font-semibold text-3xl">
        Account Settings
      </p>

      <div className="pt-8 pb-8 pl-60 pr-60 flex gap-8">
        <div className="w-60">
          <span className="text-center w-full p-2 rounded-lg border-1 ">General</span>
        </div>
        <div className="grid gap-4 w-full">
          <Card >
            <CardHeader ><p className="p-4 font-bold">Avatar</p></CardHeader>
            <CardBody>
              <div className="flex w-full justify-between p-4">
                <div>
                  <p>This is your avatar.</p>
                  <p>
                    Click on the avatar to upload a custom one from your files.
                  </p>
                </div>
                  <Avatar src={session?.user?.image as string} className="w-20 h-20 text-large cursor-pointer" />
               
              </div>
            </CardBody>
            <CardHeader className="border-t-1 rounded-none p-4">
              An avatart is optional but strongly recommended.
            </CardHeader>
          </Card>


          <Card >
            <CardHeader ><p className="p-4 font-bold">Display Name</p></CardHeader>
            <CardBody>
              <div className="flex w-full justify-between p-4">
                <div className="gap-2">
                  <p>Please enter your full name, or a display name you are confortable with..</p>
                  <input type="text" className="mt-4  border-small rounded-lg p-3 shadow-sm bg-blue-100 " value={session?.user?.name as string}/>
                </div>
                 
               
              </div>
            </CardBody>
            <CardFooter className="border-t-1 rounded-none p-4 justify-between">
            Please use 32 characters at maximum.
            <Button color="default">Save</Button>
            </CardFooter>
          </Card>


          <Card >
            <CardHeader ><p className="p-4 font-bold">Email</p></CardHeader>
            <CardBody>
              <div className="flex w-full justify-between p-4">
                <div className="gap-2">
                  <p>Please enter the email address you want to use to log in with Blink.</p>
                  <input type="text" className="mt-4  border-small rounded-lg p-3 shadow-sm bg-blue-100 " value={session?.user?.email as string}/>
                </div>
                 
               
              </div>
            </CardBody>
            <CardFooter className="border-t-1 rounded-none p-4 justify-between">
            We will email you to verify the change.

            <Button color="default">Save</Button>
            </CardFooter>
          </Card>

          <Card >
            <CardHeader ><p className="p-4 font-bold">Blink ID</p></CardHeader>
            <CardBody>
              <div className="flex w-full justify-between p-4">
                <div className="gap-2">
                  <p>This is your user ID within Blink.</p>
                  <Snippet className="pt-4 mt-4">765Ghg565G6555</Snippet>
                </div>
                 
               
              </div>
            </CardBody>
            <CardHeader className="border-t-1 rounded-none p-4">
            Used when interacting with the Vercel API.
            </CardHeader>
          </Card>

          <Card>
            <CardHeader ><p className="p-4 font-bold">Delete Account</p></CardHeader>
            <CardBody>
              <div className="flex w-full justify-between p-4">
                <div className="gap-2">
                  <p>Permanently remove your Personal Account and all of its contents from the Vercel platform. This action is not reversible, so please continue with caution.</p>
                </div>
                 
               
              </div>
            </CardBody>
            <CardHeader className=" border-t-1 rounded-none p-4 bg-red-100 justify-end">
            <Button color="danger">Delete Personal Account</Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
