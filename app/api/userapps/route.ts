import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { createuserapp, getuserapp } from "@/prisma/userapps";




export const GET = async (req: NextRequest, res: Response) => {
    try {
        const token = req.headers.get("Authorization");

        const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)
        const apps = await getuserapp(user.user_id)
        return NextResponse.json({ status: 201, data: apps })
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

        const user_app = await createuserapp(body.app_id, user.user_id)

        return NextResponse.json({ status: 201, data: user_app })

    } catch (err) {
        console.log("common events", err)
        return NextResponse.json({ status: 400 })
    }
}