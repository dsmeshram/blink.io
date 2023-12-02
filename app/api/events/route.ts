import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import jwt from 'jsonwebtoken';
import { isUserExist } from "@/prisma/user";
import { createPreDefineEvents, getUserEvent, toggleUserEvent } from "@/prisma/event";


let commonevents = [
  {
    event_name: "Hazarat Ali's Birthday",
    event_type: "Festival",
    event_date: "2024-12-01T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://www.shutterstock.com/shutterstock/photos/1341614177/display_1500/stock-vector--hazrat-alis-birthday-march-1341614177.jpg",
  },

  {
    event_name: "Republic Day",
    event_type: "Festival",
    event_date: "2024-12-01T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-73585502/73585502.jpg",
  },
  {
    event_name: "Vasant Panchami",
    event_type: "Festival",
    event_date: "2024-12-02T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-73585502/73585502.jpg",
  },
  {
    event_name: "Shivaji Jayanti",
    event_type: "Festival",
    event_date: "2024-12-02T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://static.vecteezy.com/system/resources/previews/002/154/622/original/shivaji-jayanti-illustration-and-background-free-vector.jpg",
  },
  {
    event_name: "Holika Dahana",
    event_type: "Festival",
    event_date: "2024-12-03T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://feeds.abplive.com/onecms/images/uploaded-images/2022/03/16/c5ff751d6490a2c58b8f23636550492c_original.jpg",
  },
  {
    event_name: "Holi",
    event_type: "Festival",
    event_date: "2024-12-03T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://housing.com/news/wp-content/uploads/2023/03/Colours-of-Holi-What-is-the-significance-of-different-colours-f.jpg",
  },
  {
    event_name: "Goog frieday",
    event_type: "Festival",
    event_date: "2024-12-03T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://www.vedantu.com/seo/content-images/12300c6f-dd1e-4a95-8a55-135a60a55d48.jpg",
  },
  {
    event_name: "Easter Day",
    event_type: "Festival",
    event_date: "2024-12-03T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://images.indianexpress.com/2021/04/easter.jpg",
  },

  {
    event_name: "Ugadi",
    event_type: "Festival",
    event_date: "2024-12-03T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://karnataka.b-cdn.net/wp-content/uploads/2007/07/Ugadi_Pacchadi.jpg",
  },
  {
    event_name: "Gudi Padwa",
    event_type: "Festival",
    event_date: "2024-12-03T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://static.toiimg.com/thumb/msid-98857614,width-1280,height-720,resizemode-4/98857614.jpg",
  },
  {
    event_name: "Ramzan Id/Eid-ul-Fitar (Tentative Date)",
    event_type: "Festival",
    event_date: "2024-12-03T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://www.vedantu.com/seo/content-images/12300c6f-dd1e-4a95-8a55-135a60a55d48.jpg",
  },
  {
    event_name: "Vaisakhi",
    event_type: "Festival",
    event_date: "2024-03-25T04:17:26.550Z",
    event_desc :"",
    create_by :"admin",
    avatar: "https://www.vedantu.com/seo/content-images/12300c6f-dd1e-4a95-8a55-135a60a55d48.jpg",
  }
];


export const GET = async (req: NextRequest, res: Response) => {
  try {
    const token = req.headers.get("Authorization");

    const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)
    const user_events = await getUserEvent(user.user_id, "ACTIVATE")

    console.log("common events", commonevents.length, user_events.length)

    let user_gen_events: any[] = []
    // await Promise.all(user_events.map(async (event: any) => {
    //   const mainevent = await getEvent(event.event_id);
    //   user_gen_events.push(mainevent)
    // }));

    return NextResponse.json({ status: 200, events: commonevents, user_events: user_gen_events })
  } catch (err) {
    console.log("common events",err)
    return NextResponse.json({ status: 400 })
  }
}

const createEventScema = z.object({
  event_name: z.string().min(1).max(255),
  event_desc: z.string().min(1),
  event_type: z.string(),
  event_date: z.string().min(1)
})

const createUserEventScema = z.object({
  event_id: z.string().min(1),
  user_id: z.string().min(1),
  status: z.string().min(1),
})

export const POST = async (req: NextRequest, res: Response) => {
  try {
    const body = await req.json()

    if (body.admin == true){
      console.log("here")
      const events = await createPreDefineEvents(commonevents)
      return NextResponse.json({ status: 200, data: events })
    }

    // const token = req.headers.get("Authorization");

    // const data: any = jwt.verify(token as string, process.env.JWT_SECRET as string)

    // const user = await isUserExist(data.user_email)

    // if (user == null) {
    //   return NextResponse.json({ status: 400, data: "User not valid" })
    // }

    // const validation = createEventScema.safeParse(body)
    // if (!validation.success)
    //   return NextResponse.json(validation.error.errors)

    // // const new_event: any = await createEvent(body.event_name, body.event_desc, body.event_date, body.event_type)

    // // // create user event

    // // console.log("new event", new_event)

    // // const validation_user_event = createUserEventScema.safeParse({ event_id: new_event.id, user_id: user.id, status: "ACTIVATE" })

    // // if (!validation_user_event.success)
    // //   return NextResponse.json(validation_user_event.error.errors)

    // // const new_user_event: any = await createUserEvent(new_event.id, user.id, "ACTIVATE")

    // // console.log("new user event", new_user_event)

    // return NextResponse.json({ status: 201 })
  } catch (err) {
    return NextResponse.json({ status: 400, error: err })
  }
}

export const DELETE = async (req: NextRequest, res: Response) => {
  try {
    const body = await req.json()

    const token = req.headers.get("Authorization");

    const data: any = jwt.verify(token as string, process.env.JWT_SECRET as string)

    const user = await isUserExist(data.user_email)

    if (user == null) {
      return NextResponse.json({ status: 400, data: "User not valid" })
    }

    const flag_event = toggleUserEvent(user.id, body.event_id, body.flag)

    return NextResponse.json({ status: 201 , data : flag_event})
  } catch (err) {
    return NextResponse.json({ status: 400, error: err })
  }
}