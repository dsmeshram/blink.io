"use client";

import { Button, Checkbox } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventsTable from "../../components/EventsTable";
import EventTool from "../../components/EventTool";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const events_type = [
  {
    label: "Welcome New Employees",
    value: 100,
    description:
      "We are delighted to have you among us. On behalf of all the members and the management, we would like to extend our warmest welcome and good wishes!",
  },
  {
    label: "Give Kudos",
    value: 101,
    description: "The most popular pet in the world",
  },
  {
    label: "Project Launch",
    value: 102,
    description: "The most popular pet in the world",
  },
  {
    label: "Work Anniversary",
    value: 103,
    description: "The most popular pet in the world",
  },
  {
    label: "New Position",
    value: 104,
    description: "The most popular pet in the world",
  },
  {
    label: "New Certification",
    value: 105,
    description: "The most popular pet in the world",
  },
];

interface IFormInput {
  event_name: string;
  event_date: string;
  event_desc: string;
  event_type: Number;
  event_id: string;
  send_to: string;
}

interface Events {
  event_name: string;
  id: number;
  avatar: string;
  email: string;
  role: string;
  event_date: string;
  status: string;
}

const EventPage = (prop: any) => {
  const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
  const [selected, setSelected] = React.useState<any>("EVENTS");
  const [selectedevent, setSelectedEvent] = React.useState<any>();

  function onselectionchage(type: string) {
    setSelected(type);
  }

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [events, setEvents] = React.useState<Events[]>([]);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // data["event_date"] =  data["event_date"]
    if (selectedevent) {
      data["event_id"] = selectedevent.id;
      data["event_date"] = new Date(
        selectedevent.event_date
      ).toISOString();
      const response = await fetch("/api/userevents", {
        method: "PATCH", // or 'POST', 'PUT', etc.
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API's requirements
          Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
        },
        // You can include a body for POST or PUT requests
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status == 201) {
        toast.success("Update event successfuly !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        get_events()
        onClose()
      } else {
        alert("event fail to add");
      }
    }else{

    data["event_date"] = new Date(data.event_date).toISOString();
    data["event_type"] = Number(data["event_type"]);
    const response = await fetch("/api/userevents", {
      method: "POST", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API's requirements
        Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
      // You can include a body for POST or PUT requests
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    if (result.status == 201) {
      toast.success("Success create event !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      get_events()
      onClose()
    } else {
      toast.success("Error during event creation !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  };

  function oncalel() {
  }

  async function get_events() {
    const response = await fetch("/api/userevents", {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API's requirements
        Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
    });
    const result = await response.json();
    if (result.status == 201) {
      setEvents(result.events);
    } else {
      setEvents([]);
    }
  }

  useEffect(() => {
    

    get_events();
  }, []);

  function add_new_event() {
    onOpen();
  }

  function onDeleteEvent(event_id : any){
    const status = toggle_events(true,event_id)
  }

  async function toggle_events(flag : Boolean, event_id: String) {
    const response = await fetch('/api/userevents', {
      method: 'DELETE', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
        'Authorization': localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
      body : JSON.stringify({"flag": flag, "event_id": event_id})
    });
    const result = await response.json();
    if (result.status == 201) {
      get_events()
    }
  }


  function onViewEvent(event_id: any){
    events.map((e : any)=>{
      if (e.event.id === event_id){
        setSelectedEvent(e.event)
          date = new Date(e.event.event_date)
            .toISOString()
            .substring(0, 16);
          setValue("event_name",e.event.event_name);
          setValue("event_type", e.event.event_type as number, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue("event_desc", e.event.event_desc, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue("event_date", date, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue("send_to", e.event.send_to, {
            shouldValidate: true,
            shouldDirty: true,
          });
          onOpen()
      }
    })
   
  }

  return (
    <>
      <div className="grid p-4">
        <EventTool add_new_event={add_new_event} />
        <div className="p-4">
          <EventsTable onViewEvent={(e :any)=>onViewEvent(e)} events={events} isSubmitting={false} onDeleteEvent={(e: any)=>onDeleteEvent(e)}/>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Event</ModalHeader>
              <form
                className=" w-full h-full p-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="w-full flex flex-col gap-4">
                  <p>Event Name</p>
                  <input
                    type="text"
                    className=" w-1/3 border-small rounded-lg p-3 shadow-sm bg-blue-100 text-blue-700"
                    {...register("event_name")}
                  />
                  <p>Event Date and Time</p>
                  <input
                    color="primary"
                    type="datetime-local"
                    defaultValue={date}
                    className="w-fit border-small rounded-lg p-3 shadow-sm bg-blue-100 text-blue-700"
                    {...register("event_date")}
                  />
                  <p>Select an Event Typ</p>
                  <select
                    className=" w-1/3 border-small rounded-lg p-3 shadow-sm bg-blue-100 text-blue-700"
                    {...register("event_type")}
                  >
                    {events_type.map((animal) => (
                      <option
                        key={animal.value as number}
                        value={animal.value as number}
                      >
                        {animal.label}
                      </option>
                    ))}
                  </select>
                  {/* <Select
          label="Select an Event Type"
          className="max-w-xs "
          color="primary"
          selectionMode='single'
          onSelectionChange={(i : any)=>setTypeValue(i)}
          {...register("event_type")}
        >
          {events_type.map((animal) => (
            <SelectItem key={animal.value as number} value={animal.value as number}>
              {animal.label}
            </SelectItem>
          ))}
        </Select> */}
                  <p>Event Details</p>
                  <textarea
                    color="primary"
                    {...register("event_desc")}
                    placeholder="Enter your description"
                    className="max-w-xl border-small rounded-lg p-3 shadow-sm bg-blue-100 text-blue-700"
                  />
                  <p>To Email Address</p>
                  <input
                    type="email"
                    color="primary"
                    className="max-w-xl border-small rounded-lg p-3 shadow-sm bg-blue-100 text-blue-700"
                    {...register("send_to")}
                  />

                  <Checkbox defaultSelected>Auto Generate Tag&lsquo;s</Checkbox>

                  <br></br>
                  <div className="flex justify-end gap-4 pb-4">
                    <Button onClick={oncalel}>Cancel</Button>
                    <Button type="submit" color="secondary">
                      {" "}
                      Add Event
                    </Button>
                  </div>
                </div>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default EventPage;
