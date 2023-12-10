import prisma from './prismaclient'



export const createPreDefineEvents = async (events : any) => {
    console.log(events)
    const user_event = await prisma.event.createMany({
        data: events
    })

    console.log(user_event, events)

    return user_event
}



export const createUserEvent = async (event_id: string, user_id: string, status: string) => {

    

    const user_event = await prisma.userEvent.create({
        data: { event_id: event_id, user_id: user_id, status: "waiting" }
    })

    return user_event
}


export const getUserEvent: any = async (user_id: string, status: string) => {

    console.log("user id", user_id)

    const user_events = await prisma.userEvent.findMany({
        where: {
            user_id: user_id
        }
    })
    return user_events
}

export const toggleUserEvent: any = async (user_id: string, event_id: string, flag: boolean) => {

    const user_events = await prisma.userEvent.updateMany({
        where: {
            user_id: user_id, event_id: event_id,
        },
        data: {
            isDisable : flag
        },
    })

    console.log("updating user event")
    return user_events
}


export const update_status_event: any = async ( event_id: string, status: string) => {

    const user_events = await prisma.userEvent.update({
        where: {
            id: event_id,
        },
        data: {
            status : status
        },
    })

    console.log("updating user event",status , event_id)
    return user_events
}


