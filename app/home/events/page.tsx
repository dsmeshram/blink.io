"use client";

import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
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
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import MediaGallery from "@/app/components/MediaGallery";
import Preview from "@/app/components/Preview";
import EventGrid from "@/app/components/EventGrid";

interface IFormInput {
  event_name: string;
  event_date: string;
  event_desc: string;
  event_type: Number;
  event_id: string;
  send_to: string;
  attach_media: any[];
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
  const [eventtype, setEventtype] = React.useState("Immediately");
  const [details, setDetails] = React.useState("");
  const [isMedia, setMedia] = React.useState("NO");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedevent, setSelectedEvent] = React.useState<any>();
  const attached_media: any[] = [];
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
  const { register, handleSubmit, watch,setValue , getValues } = useForm<IFormInput>();
  const [events, setEvents] = React.useState<Events[]>([]);




  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (selectedevent) {
      data["event_id"] = selectedevent.id;
      data["event_date"] = new Date(selectedevent.event_date).toISOString();
      const response = await fetch("/api/userevents", {
        method: "PATCH", // or 'POST', 'PUT', etc.
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API's requirements
          Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
        },
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
        get_events();
        onClose();
      } else {
        toast.success("Update event fail !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      if (data.event_date) {
        data["event_date"] = new Date(data.event_date).toISOString();
      } else {
        data["event_date"] = new Date(date).toISOString();
      }

      data["event_type"] = Number(data["event_type"]);
      const response = await fetch("/api/userevents", {
        method: "POST", // or 'POST', 'PUT', etc.
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API's requirements
          Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status == 201) {
        if (result.data && eventtype == "Immediately") {
          send_events(result.data.id);
        }
        get_events();
        onClose();
      } else {
        toast.success("Error during event creation !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  function oncalel() {}

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

  async function send_events(event_id: string) {
    const response = await fetch("/api/triggers", {
      method: "POST", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API's requirements
        Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
      body: JSON.stringify({
        event_id: event_id,
        attach_media: attached_media,
      }),
    });
    const result = await response.json();
    if (result.status == 201) {
      toast.success("Event send successfullly", {
        position: toast.POSITION.TOP_RIGHT,
      });
      get_events();
    } else {
      toast.success("Event send has a problem", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  useEffect(() => {
    get_events();
  }, []);

  function add_new_event() {
    onOpen();
  }

  function onSendEvent(event_id: any) {
    send_events(event_id);
  }

  function onDeleteEvent(event_id: any) {
    const status = toggle_events(true, event_id);
  }

  async function toggle_events(flag: Boolean, event_id: String) {
    const response = await fetch("/api/userevents", {
      method: "DELETE", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API's requirements
        Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
      body: JSON.stringify({ flag: flag, event_id: event_id }),
    });
    const result = await response.json();
    if (result.status == 201) {
      get_events();
    }
  }

  function onViewEvent(event_id: any) {
    events.map((e: any) => {
      if (e.event.id === event_id) {
        setSelectedEvent(e.event);
        date = new Date(e.event.event_date).toISOString().substring(0, 16);
        setValue("event_name", e.event.event_name);
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
        onOpen();
      }
    });
  }

  function onImageChange(params: any) {
    attached_media.push(params);
  }

  return (
    <>
      <div className="">
        <EventTool add_new_event={add_new_event} />
        {/* <EventGrid events={events}/> */}
        <EventsTable
          onSendEvent={(e: any) => onSendEvent(e)}
          onViewEvent={(e: any) => onViewEvent(e)}
          events={events}
          isSubmitting={false}
          onDeleteEvent={(e: any) => onDeleteEvent(e)}
        />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-1">Post</ModalHeader>
              <form
                className=" w-full h-full pl-8 pr-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <div className="grid-cols-2 flex gap-2">
                    <div className="w-full flex justify-start flex-col gap-4 p-4  rounded-lg">
                      <div className="justify-start grid-flow-row h-48 w-full border-small rounded-lg p-3 shadow-sm bg-blue-100 text-blue-700">
                        <textarea
                          maxLength={250}
                          color="secondary"
                          {...register("event_desc")}
                          placeholder="Enter your post description"
                          className="w-full h-40 rounded-lg p-2 focus:border-transparent focus:border-0"
                        />
                      </div>
                      <div className="grid p-4 gap-4   border-1 rounded-lg bg-slate-200">
                        <div className="flex gap-4">
                          <RadioGroup
                            value={isMedia}
                            color="secondary"
                            onValueChange={setMedia}
                            label="Do you want to attach some media for yur post?"
                            orientation="horizontal"
                          >
                            <Radio value="NO">No</Radio>
                            <Radio value="YES">Yes</Radio>
                          </RadioGroup>
                        </div>
                        {isMedia == "YES" && (
                          <MediaGallery
                            onImageChange={(e: any) => onImageChange(e)}
                          ></MediaGallery>
                        )}
                      </div>

                      <div className="bg-slate-200 rounded-lg border-1 p-4">
                        <RadioGroup
                          color="secondary"
                          label="When you want to post this event?"
                          orientation="horizontal"
                          value={eventtype}
                          onValueChange={setEventtype}
                        >
                          <Radio value="Immediately">Immediately</Radio>
                          <Radio value="Specific">Specific Date and Time</Radio>
                        </RadioGroup>
                        {eventtype == "Specific" && (
                          <input
                            color="primary"
                            type="datetime-local"
                            defaultValue={date}
                            className="mt-4 w-fit border-small rounded-lg p-3 shadow-sm  text-blue-700"
                            {...register("event_date")}
                          />
                        )}
                      </div>

                      <div className="bg-slate-200 rounded-lg border-1 p-4">
                        <p className="pb-2">
                          Do you want to send same event to your emails?
                        </p>
                        <input
                          type="email"
                          placeholder="Enter email address"
                          color="secondary"
                          className="max-w-md border-small rounded-lg p-3 shadow-sm  text-blue-700"
                          {...register("send_to")}
                        />
                      </div>

                      <p>Do you want to auto generate Tag?</p>

                      <Checkbox defaultSelected color="secondary">
                        Auto Generate Tag&lsquo;s
                      </Checkbox>

                      <CheckboxGroup
                        label="Do your want to send this event on which Application?"
                        orientation="horizontal"
                        color="secondary"
                        defaultValue={["lidn"]}
                      >
                        <Checkbox value="lidn">Linkedin</Checkbox>
                        <Checkbox value="tw" isDisabled>Twitter/X-corp</Checkbox>
                        <Checkbox value="fb" isDisabled>Facebook</Checkbox>
                        <Checkbox value="whtapp" isDisabled>WhatsApp</Checkbox>
                        <Checkbox value="insta" isDisabled>Instagram</Checkbox>
                      </CheckboxGroup>


                      <div className="justify-end gap-4 flex w-full">
                            <Button type="submit" color="secondary">
                              Share Your Post
                            </Button>
                        </div>
                    </div>

                    <div className="w-full p-4 bg-slate-200 ">
                      <h1 className="font-bold text-white">Preview</h1>
                      <div className="grid gap-4 h-full">
                        <Preview
                          data={watch("event_desc") || ""}
                          isImagesloading={false}
                          isDetails={true}
                          isLoaded={false}
                        />
                        
                      </div>
                    </div>
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
