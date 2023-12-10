'use client'

import React, { useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, ChipProps, Tooltip, Avatar, Pagination, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, CheckboxIcon, commonColors, Button } from "@nextui-org/react";
import { ArrowSmallRightIcon, CheckCircleIcon, CheckIcon, EyeIcon, LockClosedIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import EventLoading from './EventLoading';
import Confirmation from './Confirmation';
import NoEvents from './NoEvents';


const statusColorMap: Record<string, ChipProps["color"]> = {
    success: "success",
    problem: "primary",
    waiting: "secondary",
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

    const [events, setEvent] = React.useState<any>(undefined);

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

    const viewClick = (e : any) => {
        e.preventDefault()
        prop.onViewEvent(e.target.id)
    }

    const deleteClick = (e : any) => {
        setEvent(e.target.id)
        onOpen();
    }

    const sendClick = (e : any) => {
        setEvent(e.target.id)
        prop.onSendEvent(e.target.id)
    }

    function callback(type: any) {
        if (type == "cancel") {
            onClose()
            setEvent(undefined)
        }
        else {
            prop.onDeleteEvent(events)
            onClose()
            setEvent(undefined)
        }

    }

    return (
        <>
            <div className='pt-4'>

                {prop.isSubmitting && <EventLoading />}


                {prop.events.length !=0 && prop.events && <Table removeWrapper aria-label="Example static collection table" bottomContent={
                        <div className="flex w-full justify-end">
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
                                <TableRow key={event.event.id} className='border-b-1'>
                                    <TableCell>
                                        <div className='flex gap-4'>
                                            <Avatar radius="sm" src={event?.event?.avatar} className="w-10 h-10 text-large"></Avatar>
                                            <div className='grid'>
                                                <span className='font-bold ' color='#323232'>{event.event.event_name}</span>
                                                <span className='font-normal text-gray-700'>{event.event.send_to}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='grid'>
                                            <span className='font-bold text-grey-500' >{new Date(event.event.event_date).toDateString()}</span>
                                            <span className='font-normal text-grey-800' >{event.event.event_type}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Chip size="sm" variant="flat"
                                           
                                            color={statusColorMap[event.status]}
                                        >
                                            {event.status}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <div className="relative flex items-center gap-2">
                                        

                                            <Button startContent={<PencilSquareIcon className='h-4 w-4 bg-transparent' />} id={event.event.id } isIconOnly  onClick={(e) => viewClick(e)} aria-label="Like" className="cursor-pointer active:opacity-50 bg-transparent">
                                                
                                                </Button>

                                                <Button startContent={<LockClosedIcon className='h-4 w-4 bg-transparent' />} id={event.id } disabled={event.isDisable} isIconOnly  onClick={e => deleteClick( e)} aria-label="Like" className=" bg-transparent cursor-pointer active:opacity-50">
                                                </Button>

                                                <Button startContent={<ArrowSmallRightIcon className='h-4 w-4 bg-transparent' />} id={event.id } disabled={event.isDisable} isIconOnly  onClick={e => sendClick( e)} aria-label="Like" className=" bg-transparent cursor-pointer active:opacity-50">
                                                </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>}
                    

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