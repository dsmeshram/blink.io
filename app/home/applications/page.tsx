"use client";

import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Chip,
  ChipProps,
  Code,
  Input,
  Listbox,
  ListboxItem,
  Textarea,
} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useSearchParams } from "next/navigation";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface App {
  app_name: string;
  avatar: string;
  id: string;
  status: string;
}

interface Apps {
  id: string;
  app: App;
}

var token: string = "";
const ADD_NEW_APP: string = "ADD_NEW_APP";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Active: "success",
  problem: "primary",
  waiting: "secondary",
};

const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const UserApplicationspage = () => {
  const [apps, setApps] = React.useState<Apps[]>([]);
  const [selectedApp, setApp] = React.useState<any>();
  const searchParams = useSearchParams();

  const { data: session } = useSession();

  console.log(session?.user?.name);

  async function onconnect() {
    signIn("linkedin");
  }

  async function get_user_apps() {
    const response = await fetch("/api/userapps", {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API's requirements
        Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    if (result.status == 201) {
      if (result.data) {
        setApps(result.data);
        setApp(result.data[0]);
      } else {
        setApps([]);
      }
    } else {
      setApps([]);
    }
  }

  function select_item(id: string) {
    if (id == ADD_NEW_APP) {
      linkedInLogin()
    } else {
      apps.map((item: any) => {
        if (item.app.id == id) {
          setApp(item);
        }
      });
    }
  }

  useEffect(() => {
    console.log(searchParams.get("code"), " code is ");
    token = localStorage.getItem("Authorization") || "";
    get_user_apps();
  }, []);

  const { linkedInLogin } = useLinkedIn({
    scope: "r_liteprofile+r_emailaddress+w_member_social+rw_organization_admin",
    clientId: process.env.LINKEDIN_CLIENT_ID as string,
    redirectUri: `${process.env.LINKEDIN_REDIRECT}/api/social?user_token=${token}`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="flex p-2 h-screen gap-4 ">
        <div className="w-96 bg-slate-100 h-full rounded-lg p-2">
          <div className="flex items-center justify-between gap-2">
            <Input
              placeholder="Search"
              endContent={<MagnifyingGlassIcon className="h-4 w-4 " />}
            />
            <Button
              isIconOnly
              startContent={<AdjustmentsHorizontalIcon className="h-4 w-4 " />}
            ></Button>
          </div>
          <h1 className="p-4 ">Available 3rd Party Applications</h1>
          <Listbox onAction={(key) => select_item(key as string)}>
            <ListboxItem key="ADD_NEW_APP">
              <div className="flex gap-2 items-center  rounded-lg pl-4 pr-4 pt-2 pb-2 bg-blue-500">
                <Avatar
                  alt="Add new app"
                  size="lg"
                  isBordered
                  radius="lg"
                  src=""
                />
                <div className="flex flex-col">
                  <span className="text-medium capitalize p-2 text-white">
                    Add New Application
                  </span>

                  <div className="flex justify-end">
                    {/* <Button isIconOnly startContent={<CheckCircleIcon className='h-4 w-4'/>}  onClick={linkedInLogin}></Button> */}
                  </div>
                </div>
              </div>
            </ListboxItem>
          </Listbox>
          <Listbox
            items={apps}
            aria-label="Dynamic Actions"
            onAction={(key) => select_item(key as string)}
          >
            {(item) => (
              <ListboxItem className="" key={item.app.id}>
                <div className="flex gap-2 items-center bg-slate-300  rounded-lg pl-4 pr-4 pt-2 pb-2 ">
                  <Avatar
                    alt={item.app.app_name}
                    size="lg"
                    isBordered
                    radius="lg"
                    src={item.app.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="text-medium capitalize p-2">
                      {item.app.app_name}
                    </span>
                    <Chip
                      size="sm"
                      variant="flat"
                      className="capitalize pl-2"
                      color={statusColorMap[item?.app?.status]}
                    >
                      {item.app.status}
                    </Chip>
                    <div className="flex justify-end">
                      {/* <Button isIconOnly startContent={<CheckCircleIcon className='h-4 w-4'/>}  onClick={linkedInLogin}></Button> */}
                    </div>
                  </div>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </div>

        <div className="w-full flex flex-col gap-4 p-4 border h-auto rounded-lg">
          <p className="font-extrabold capitalize">
            {" "}
            {selectedApp?.app.app_name}
          </p>
          <Accordion variant="light" defaultExpandedKeys={["1"]}>
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Status"
              subtitle="About The Application status"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Connections & Secrets"
              subtitle="Enable or Disable The connection"
            >
              <p className="p-4">Do you want to disaconnect</p>
              <Button color="danger" onClick={onconnect} className="w-60">
                {" "}
                Disconnect{" "}
              </Button>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Advance">
              <p className="p-2">Access Code</p>
              <Code className="w-80 h-10 overflow-hidden" size="lg">
                {selectedApp?.metadata.access_token}
              </Code>
              <p className="p-2">Application Code</p>
              <Code className="w-80 h-10 overflow-hidden" size="lg">
                {selectedApp?.metadata.app_token}
              </Code>

              <p className="p-2">Others</p>
              <Textarea
                defaultValue={JSON.stringify(selectedApp?.metadata.other)}
              ></Textarea>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default UserApplicationspage;
