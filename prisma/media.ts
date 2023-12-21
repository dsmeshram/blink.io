import prisma from './prismaclient'


export const create_media_for_Event = async (media : any) => {
    const user_event = await prisma.media.create({
        data: media
    })

    return user_event
}
