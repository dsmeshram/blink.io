import prisma from './prismaclient'




export const create_new_user_event = async (user_id: string, req: any) => {

    const event_obj = {
        event_date: req.event_date, event_name: req.event_name, event_type: req.event_type, event_desc: req.event_desc
    }

    const new_event = await prisma.event.create({
        data: event_obj
    })

    if (new_event != null) {
        const user_event_obj = await prisma.userEvent.create({
            data: {
                user_id: user_id, event_id: new_event.id, status: "Active",
                event: {
                    create: event_obj
                }
            }
        })

        return user_event_obj;
    }
    return null;

}


export const get_user_event = async (user_id: string) => {
    const user_event_obj = await prisma.userEvent.findMany({
        where: { user_id: user_id }, 
        include:
        {
            event: true
        } 
    })
    return user_event_obj
}


export const update_user_event = async (user_id: string,body: any) => {
    const event_obj = {
        event_date:body.event_date, event_name: body.event_name, event_type: body.event_type, event_desc: body.event_desc
    }
    const user_event_obj = await prisma.userEvent.update({
        where: { user_id: user_id , event_id :body.event_id }, 
        data: {
            event: {
                create: event_obj
            }
          },
    })
    return user_event_obj
}
