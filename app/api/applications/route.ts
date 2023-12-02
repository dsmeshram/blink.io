import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import jwt from 'jsonwebtoken';
import { createDefaultapps, getDefaultapps } from "@/prisma/apps";




export const GET = async (req: NextRequest, res: Response) => {
    try {
        // const token = req.headers.get("Authorization");

        // const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)

        const apps = await getDefaultapps()
        return NextResponse.json({ status: 200, data :  apps})
    } catch (err) {
        console.log("common events", err)
        return NextResponse.json({ status: 400 })
    }
}


export const POST = async (req: NextRequest, res: Response) => {
    try {
        //   const token = req.headers.get("Authorization");

        //   const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)

        // const apps = await createDefaultapps()
        // return NextResponse.json({ status: 400, apps: apps })

        return NextResponse.json({ status: 200 })

    } catch (err) {
        console.log("common events", err)
        return NextResponse.json({ status: 400 })
    }
}