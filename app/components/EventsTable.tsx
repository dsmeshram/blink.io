'use client'

import React, { useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, ChipProps, Tooltip, Avatar, Pagination, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, CheckboxIcon, commonColors } from "@nextui-org/react";
import { CheckCircleIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import EventLoading from './EventLoading';
import Confirmation from './Confirmation';


const statusColorMap: Record<string, ChipProps["color"]> = {
    success: "success",
    paused: "primary",
    vacation: "primary",
};

interface Events {
    event_name: string
    id: number
    avatar: string
    email: string
    role: string
    event_date: string
    status: string
}


const alert_message = "Dow you want to Delete?"

const EventsTable = (prop: any) => {

    console.log(prop)

    if (prop.selectedevent){
        console.log(prop.selectedevent)
    }

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;
    let pages = Math.ceil(prop.events.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return prop.events.slice(start, end);
    }, [page, prop.events]);

    function event_menu_change(action_type: string, data: any) {
        if (action_type == "DISABLE") {
            prop.onDeleteEvent(data.target.id)
            onOpen();
        } else if (action_type == "VIEW") {
            prop.onViewEvent(data.target.id)

        }
    }

    function callback(type: any) {
        console.log("action is  event", type)
        if (type == "cancel") {
            onClose()
        }
        else {
            onClose()
        }

    }

    return (
        <>
            <div className='pt-4'>


                {prop.events.length != 0 && <Table removeWrapper aria-label="Example static collection table" bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}>
                    <TableHeader>
                        <TableColumn>EVENT NAME</TableColumn>
                        <TableColumn>DATE & TYPE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                        {(event: any) => (
                            <TableRow key={event.event.id}>
                                <TableCell>
                                    <div className='flex gap-4'>
                                        <Avatar radius="sm" src={event?.event?.avatar} className="w-10 h-10 text-large"></Avatar>
                                        <div className='grid'>
                                            <span className='font-bold'>{event.event.event_name}</span>
                                            <span className='font-thin text-grey-800'>{event.event.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='grid'>
                                        <span className='font-bold'>{new Date(event.event.event_date).toDateString()}</span>
                                        <span className='font-thin text-grey-800'>{event.event.event_type}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        startContent={<CheckCircleIcon className='h-4 w-4' />}
                                        color="success"
                                    >
                                        Success
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex justify-start gap-4">
                                        <Tooltip content="Details">
                                            <span className="text-primary cursor-pointer active:opacity-50">
                                                <EyeIcon id={event.id} className='h-4 w-4' onClick={e => event_menu_change("VIEW", e)} />
                                            </span>
                                        </Tooltip>

                                        <Tooltip color="danger" content="Delete user">
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <TrashIcon id={event.id} className='h-4 w-4' onClick={e => event_menu_change("DISABLE", e)} />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>}
                {prop.events.length == 0 && <EventLoading />}

                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size='sm'>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Alert
                                </ModalHeader>
                                <ModalBody>
                                    <Confirmation message={alert_message} callback={callback}></Confirmation>
                                </ModalBody>

                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}

export default EventsTable