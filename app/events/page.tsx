"use client"

import { Button, Checkbox, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const events_type = [
  { label: "Welcome New Employees", value: 100, description: "We are delighted to have you among us. On behalf of all the members and the management, we would like to extend our warmest welcome and good wishes!" },
  { label: "Give Kudos", value: 101, description: "The most popular pet in the world" },
  { label: "Project Launch", value: 102, description: "The most popular pet in the world" },
  { label: "Work Anniversary", value: 103, description: "The most popular pet in the world" },
  { label: "New Position", value: 104, description: "The most popular pet in the world" },
  { label: "New Certification", value: 105, description: "The most popular pet in the world" },
];



interface IFormInput {
  event_name: string;
  event_date: string;
  event_desc: string;
  event_type: string;
}


const EventPage = (prop : any) => {
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);

 
  const [registeredAddresses, setRegisteredAddresses] = useState([]);

  const { register, handleSubmit, setValue } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    
    data["event_date"] =  data["event_date"]+ ":07.923Z"
    if (prop.selectedevent?.event){

      console.log(prop.selectedevent.event)
      data["event_id"] =  prop.selectedevent.event.id
      const response = await fetch('/api/userevents', {
        method: 'PATCH', // or 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
          'Authorization': localStorage.getItem("Authorization") as string, // Add any other headers as needed
        },
        // You can include a body for POST or PUT requests
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      if (result.status == 201) {
        prop.onSuccess()
      } else {
        alert("event fail to add")
      }
    }
  
    const response = await fetch('/api/userevents', {
      method: 'POST', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
        'Authorization': localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
      // You can include a body for POST or PUT requests
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    if (result.status == 201) {
      prop.onSuccess()
    } else {
      alert("event fail to add")
    }

  }

  function oncalel(){
    prop.event_Save()
  }


  useEffect(() => {
    if (prop.selectedevent?.event as IFormInput) {
      setRegisteredAddresses(prop.selectedevent.event);
    }
}, []);

useEffect(() => {
  if (registeredAddresses && prop.selectedevent?.event) {
    date = new Date(prop.selectedevent?.event.event_date).toDateString()
    setValue("event_name", prop.selectedevent.event.event_name);
    setValue("event_type", "101" as string);
    setValue("event_desc", prop.selectedevent.event.event_desc);
    setValue("event_date", new Date(prop.selectedevent.event.event_date).toDateString());
  }
}, [registeredAddresses]);


  return (
    <form className=' w-full h-full ' onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-4">
        <p>Event Name</p>
        <Input color="primary" type="text"  className=' w-1/3'  {...register("event_name")} />
        <p>Event Date and Time</p>
        <Input color="primary" type="datetime-local"  defaultValue={date} className='w-fit' {...register("event_date")} />
        <p>Select an Event Typ</p>
        <Select
          label="Select an Event Type"
          className="max-w-xs "
          color="primary"
          selectionMode='single'
          {...register("event_type")}
        >
          {events_type.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <p>Event Details</p>
        <Textarea
          color="primary"
          {...register("event_desc")}
          placeholder="Enter your description"
          className="max-w-xl "
        />
        <p>To Email Address</p>
        <Input size="sm" type="email" color="primary"  className="max-w-xl " />

        <Checkbox defaultSelected>Auto Generate Tag&lsquo;s</Checkbox>
       
        <br></br>
        <div className='flex justify-end gap-4 pb-4'>
          <Button onClick={oncalel}>Cancel</Button>
          <Button type='submit' color='secondary'> Add Event</Button>
        </div>

      </div>
    </form>
  )
}

export default EventPage