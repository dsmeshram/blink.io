"use client"

import { Button, Card, CardBody, CardHeader, User } from '@nextui-org/react'
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
                router.push("/users");
            }
            else {
                alert("technical error please again later")
            }
        })
    }
    return (
        <Card className='w-fit'>
            <CardHeader className='p-4'>
                Welcome to Blink!
            </CardHeader>
            <CardBody className='flex'>
                <div className='flex gap-4'>
                    <User
                        name={session?.user?.name}
                        description={session?.user?.email}
                        avatarProps={{
                            src: session?.user?.image as string
                        }}


                    />

                    <button
                        type="button" onClick={() => signOut()}
                        className="rounded-full flex items-center bg-transparent hover:bg-blue-500 text-sm font-medium  text-blue-700 hover:text-white px-2 border border-pink-200 hover:border-transparent  "
                    >

                        Sign out
                    </button>

                    {isSubmitting === true ? (
                        <Button isLoading color='secondary'
                            type="button" onClick={() => onSignin()}
                            className="rounded-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white  "
                        >
                            Start
                        </Button>
                    ) : (
                        <Button color='secondary'
                            type="button" onClick={() => onSignin()}
                            className="rounded-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white "
                        >
                            Start
                        </Button>
                    )}



                </div>
            </CardBody>
        </Card>



        // <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        //     <div className="flex justify-end px-4 pt-4">
        //         <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
        //             <span className="sr-only">Open dropdown</span>
        //             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
        //                 <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        //             </svg>

        //         </button>
        //     </div>
        //     <div className="flex flex-col items-center pb-10">
        //         <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={session?.user?.image} alt={session?.user?.name} />
        //         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{session?.user?.name} </h5>
        //         <span className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</span>
        //         <div className="flex mt-4 md:mt-6 space-x-4">

        //             <button
        //                 type="button" onClick={() => onSignin()}
        //                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  "
        //             >
        //                 Let's start
        //             </button>

        //             <button
        //                 type="button" onClick={() => signOut()}
        //                 className="flex items-center bg-transparent hover:bg-blue-500 text-sm font-medium  text-blue-700 hover:text-white px-2 border border-pink-200 hover:border-transparent rounded "
        //             >

        //                 Sign out
        //             </button>

        //             {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Log out</a> */}
        //         </div>
        //     </div>
        // </div>

    )
}

export default UserProfile
