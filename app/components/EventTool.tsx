'use client'

import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button, ButtonGroup } from '@nextui-org/react'
import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";

const EventTool = (props : any) => {
  return (
    <div className='pt-8 pr-4 flex justify-end gap-4'>
       <ButtonGroup>
        {/* <Button isIconOnly startContent={
            <MagnifyingGlassIcon className='h-8 w-8'/>
        } ></Button> */}
         <Dropdown>

      <DropdownTrigger>
        <Button isIconOnly startContent={
            <AdjustmentsHorizontalIcon className='h-6 w-6'/>
        } ></Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="new"
          shortcut="⌘N"
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
        >
          Show Delete Events
        </DropdownItem>
      </DropdownMenu>
        </Dropdown>
        <Button color='secondary' onClick={()=>props.add_new_event()}  endContent={
            <PlusIcon className='h-6 w-6'/>
        }>Add New Event</Button>
        </ButtonGroup>
    </div>
  )
}

export default EventTool