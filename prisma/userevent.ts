import prisma from './prismaclient'




export const create_new_user_event = async (user_id: string, req: any) => {

    const event_obj = {
        event_date: req.event_date, event_name: req.event_name, event_type: req.event_type, event_desc: req.event_desc, send_to : req.send_to
    }

    // const new_event = await prisma.event.create({
    //     data: event_obj
    // })

    // console.log(new_event)

    if (event_obj != null) {
        const user_event_obj = await prisma.userEvent.create({
            data: {
                user_id: user_id, status: "waiting",
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
        where: { user_id: user_id , isDisable : false},
        include :{
            event:true,
        }
    })
    return user_event_obj
}


export const get_event_u_e = async (event_id: string) => {
    const user_event_obj = await prisma.userEvent.findMany({
        where: { id: event_id},
        include : {
            event : true
        }
    })
    return user_event_obj
}


export const update_user_event = async (user_id: string,body: any) => {
    const event_obj = {
        event_date:body.event_date, event_name: body.event_name, event_type: body.event_type, event_desc: body.event_desc
    }

    const event_obj_find = await prisma.event.update({
        where: {  id :body.event_id , "create_by" : "user"},
        data: event_obj
    })
    return event_obj_find
}


export const delete_user_event = async (event_id: string , flag : boolean) => {
    
    const deleteUser = await prisma.userEvent.update({
        where: {
            id: event_id
        },
        data:{
            isDisable : flag
        }
      })

      return deleteUser
}