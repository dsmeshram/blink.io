import { NextRequest, NextResponse } from "next/server";
import { get_event_u_e } from "@/prisma/userevent";
import { update_status_event } from "@/prisma/event";
import jwt from 'jsonwebtoken';
import { getUserApps } from "@/prisma/userapps";

export const POST = async (req: NextRequest, res: Response) => {
    try {
        const body = await req.json()
        const token = req.headers.get("Authorization");
        const user: any = jwt.verify(token as string, process.env.JWT_SECRET as string)
        const event = await get_event_u_e(body.event_id)
        const user_apps = await getUserApps(user.id)
        //  get only linkdin form user account
        const app = user_apps[0]
        console.log(app)
        if (event && app){
            const datais = JSON.parse(app?.metadata?.other)
            const data= {
                "author": `urn:li:person:${ datais.id as string}`,
                "lifecycleState": "PUBLISHED",
                "specificContent": {
                    "com.linkedin.ugc.ShareContent": {
                       
                        "shareCommentary": {
                            "text": `${event[0]?.event?.event_desc as string}`
                        },
                        "shareMediaCategory": "NONE"
                    }
                },
                "visibility": {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
                }
                }


            const calllinkdin = await fetch("https://api.linkedin.com/v2/ugcPosts",
                {
                    method: "POST", // or 'POST', 'PUT', etc.
                    headers: {
                    "Content-Type": "application/json", // Adjust the content type based on your API's requirements
                    "Authorization": `Bearer ${app?.metadata?.access_token as string}`, // Add any other headers as needed
                    },
                    body : JSON.stringify(data)
            })

            const result = await calllinkdin.json();
            if (result.id){
                const calllinkdin_obj = await update_status_event(event[0].id,"success")
                return NextResponse.json({ status: 201 , post: calllinkdin_obj})
            }else{
                return NextResponse.json({ status: 401})
            }
            
        }else{
            return NextResponse.json({ status: 401,message :"event not found"})
        }
      

    } catch (err) {
        console.log("common events", err)
        return NextResponse.json({ status: 400 })
    }
}