import prisma from './prismaclient'

export const createUser = async (user_name: string, user_email: string) => {

    const user = await prisma.user.create({
        data: { user_name: user_name, user_email: user_email }
    })


    const pre_define_events = await prisma.event.findMany({
        where: {
            create_by: "admin"
        }
    })

    const events_dump = []

    for (let i = 0; i < pre_define_events.length; ++i) {
        const add_user_events = await prisma.userEvent.create({
            data: {
                user_id: user.id, event_id: pre_define_events[i].id, status: "Active",
                event: {
                    create: {
                        create_by: "admin" ,avatar: pre_define_events[i].avatar,event_date: pre_define_events[i].event_date, event_desc: pre_define_events[i].event_desc, event_type: pre_define_events[i].event_type, event_name: pre_define_events[i].event_name
                    }
                }
            }
        })
        events_dump.push(add_user_events)

    }


    Promise.all(events_dump)
        .then((results) => {
            console.log("add results", results)
        })
        .catch((e) => {
            console.log(e)
            // Handle errors here
        });


    // for (let i = 0; i < pre_define_events.length; ++i) {
    //     events_dump.push({
    //         user_id: user.id, event_id: pre_define_events[i].id, status: "Active",
    //         event: {
    //             create: pre_define_events[i]
    //         }
    //     })
    // }

    // console.log("items ",events_dump)

    // const add_user_events = await prisma.userEvent.createMany({
    //     data: events_dump
    // })

    return user
}

export const isUserExist = async (user_email: string) => {
    const user = await prisma.user.findFirst({
        where: { user_email: user_email }
    })

    if (user != null) {
        return user
    }
    return null
}