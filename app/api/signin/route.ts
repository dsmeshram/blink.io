import { createUser, isUserExist } from "@/prisma/user";
import { NextResponse } from "next/server"
import { string, z } from "zod";
import jwt from 'jsonwebtoken';

const createUserScema = z.object({
    user_name: z.string().min(1).max(255),
    user_email: z.string().min(1),
})

export const GET = async (req: Request, res: Response) => {
    try {

        const token = req.headers.get("Authorization");
        const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)

        const dbuser = await isUserExist(user.user_email)
        if (user != null){
            const user_id = dbuser.id;
            const user_name = dbuser.user_name;
            const user_email = dbuser.user_email;
            const token = jwt.sign({ user_email ,user_id ,user_name: user_name}, process.env.JWT_SECRET as string);
            return NextResponse.json({ status: 200, token: token })
        }
        return NextResponse.json({ status: 400 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 400 })
    }
}


export const POST = async (req: Request, res: Response) => {
    try {

        const body = await req.json()

        const validation = createUserScema.safeParse(body)
        if (!validation.success)
            return NextResponse.json(validation.error.errors)

        const user = await isUserExist(body.user_email)
        if (user != null){
            const email = body.user_email;
            const user_id = user.id;
            const user_name = user.user_name;
            const token = jwt.sign({ email ,user_id ,user_name: user_name}, process.env.JWT_SECRET as string);
            return NextResponse.json({ status: 200, token: token })
        }else{
            const user = await createUser(body.user_name, body.user_email)
           
            
            const email = body.user_email;
            const user_id = user.id;
            const user_name = user.user_name;
            const token = jwt.sign({ email ,user_id,user_name: user_name}, process.env.JWT_SECRET as string);
            return NextResponse.json({ status: 200, token: token })
        }

    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 400 })
    }
}
