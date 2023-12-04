import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { create_new_user_event, get_user_event, update_user_event } from "@/prisma/userevent";


export const GET = async (req: NextRequest, res: Response) => {
    try {
        const token = req.headers.get("Authorization");
        const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)
        const events = await get_user_event(user.user_id)
        return NextResponse.json({ status: 201, events })
    } catch (err) {
        console.log("common events", err)
        return NextResponse.json({ status: 400 })
    }
}




export const POST = async (req: NextRequest, res: Response) => {
    try {
        const body = await req.json()
        const token = req.headers.get("Authorization");
        const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)
        const user_event_app_obj = await create_new_user_event(user.user_id, body)
        return NextResponse.json({ status: 201 , data : user_event_app_obj})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 400 })
    }
}




export const PATCH = async (req: NextRequest, res: Response) => {
    try {
        const body = await req.json()
        const token = req.headers.get("Authorization");
        const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)
        const user_event_app_obj = await update_user_event(user.user_id, body)
        return NextResponse.json({ status: 201 , data : user_event_app_obj})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 400 })
    }
}