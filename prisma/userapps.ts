import prisma from './prismaclient'


export const createuserapp = async (app_id: string, user_id: string, meta : any) => {

    const userapp = await prisma.applications.findUnique({
        where: {
            id: app_id
        }
    })

    const apps = await prisma.userApps.create({
        data: {
            app_id: app_id, user_id :user_id, status: "0", metadata: meta ,
            app: {
                create:{
                    app_name: userapp?.app_name as string, avatar : userapp?.avatar as string, status : "Active"
                }
                
            }
        }
    })

    return apps

}


export const get_app_via_name = async (id : string) => {
    const userapp = await prisma.applications.findUnique({
        where: {
            id: id
        }
    })

    return userapp
}


export const getuserapp = async (user_id: string) => {

    const apps = await prisma.userApps.findMany({
        where: {
            user_id: user_id
        },
        include: {
            app: true,
          },
    })

    return apps
}


    export const getUserApps = async (user_id: string) => {

        const apps = await prisma.userApps.findMany({
            where: {
                user_id: user_id
            },
            include: {
                app: true,
              },
        })


    return apps

}