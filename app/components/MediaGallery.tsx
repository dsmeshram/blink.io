import React from 'react'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";


const MediaGallery = () => {
    const media_list = [{id:100,img:"", type:0,title:"ADD NEW"},{id:100,img:"", type:0,title:"title"},{id:100,img:"", type:0,title:"title"},{id:100,img:"", type:0,title:"title"}]
  return (
    <>
  
    <div className=' p-4 gap-4 grid grid-cols-2 sm:grid-cols-8 border-1 rounded-lg bg-slate-200'>
      
 {media_list.map((item, index) => (
    <Card className='bg-slate-100 h-20' shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
    <CardBody className="overflow-visible p-0 items-center ">
      <b className='text-center'>{item.title}</b>
    </CardBody>
    <CardFooter className="text-small justify-between">
      
    </CardFooter>
  </Card>
     ))}

    </div>
    </>
  )
}

export default MediaGallery