import prisma from './prismaclient'


let commonevents = [
    {
        app_name: "Facebook",
        status: "0",
        avatar: "https://play-lh.googleusercontent.com/KCMTYuiTrKom4Vyf0G4foetVOwhKWzNbHWumV73IXexAIy5TTgZipL52WTt8ICL-oIo=w240-h480",
    }, {
        app_name: "X Corp",
        status: "0",
        avatar: "https://play-lh.googleusercontent.com/A-Rnrh0J7iKmABskTonqFAANRLGTGUg_nuE4PEMYwJavL3nPt5uWsU2WO_DSgV_mOOM=w240-h480",
    }, {
        app_name: "WhatsApp",
        status: "0",
        avatar: "https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480",
    }, {
        app_name: "linkedin",
        status: "0",
        avatar: "https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw=w240-h480",
    }
]



export const createDefaultapps = async () => {

    const apps = await prisma.applications.createMany({
        data: commonevents
    })

    return apps

}


export const getDefaultapps = async () => {

    // const apps = await prisma.applications.findMany()

    return commonevents

}