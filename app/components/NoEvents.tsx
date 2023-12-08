import React from 'react'
import {Card, CardBody, CardFooter} from "@nextui-org/react";
const NoEvents = (props : any) => {

  const list = [
  
    {
      title: "Create New",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    }
  ];

  return (
    <div className='p-4 text-center h-full w-full'>
      <p className='font-semibold'> Create your first event</p>
      <div className='h-60 w-60 grid  p-8'>
        {list.map((item, index) => (
       <Card shadow="sm" key={index} isPressable onPress={() => props.add_new_event("add new")}>
          <CardBody className="overflow-visible p-4">
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b className='text-center w-full'>{item.title}</b>
          </CardFooter>
        </Card>

        
           ))}
    </div>
    </div>
  )
}

export default NoEvents