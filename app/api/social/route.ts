import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createuserapp, get_app_via_name } from "@/prisma/userapps";

export const GET = async (req: NextRequest, res: Response) => {
  try {
    const toke_and_linkdin = req.url.split("?")[1].split("&");
    const user_token = toke_and_linkdin[0].split("=")[1];
    const linkdin_app_token = toke_and_linkdin[1].split("=")[1];
    const user: any = jwt.verify(
      user_token as string,
      process.env.JWT_SECRET as string
    );

    const refresh_Token = await fetch(
      "https://api.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST", // or 'POST', 'PUT', etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", // Adjust the content type based on your API's requirements
        },

        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: linkdin_app_token as string,
          redirect_uri: `http://localhost:3000/api/social?user_token=${user_token}`,
          client_id: process.env.LINKEDIN_CLIENT_ID as string,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET as string,
        }),
      }
    );

    const refresh_token = await refresh_Token.json();

    console.log("Refresh token", refresh_token);

    const calllinkdin = await fetch("https://api.linkedin.com/v2/me", {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API's requirements
        Authorization: `Bearer ${refresh_token.access_token}`, // Add any other headers as needed
      },
    });
    const result = await calllinkdin.json();
    if (result.id) {
      const app = await get_app_via_name("65680237533af0d31dda5ac8");
      if (app) {
        const user_app = await createuserapp(app?.id, user.user_id, {
          app_token: linkdin_app_token,
          access_token: refresh_token.access_token,
          other: JSON.stringify(result),
        });


        console.log("linkdin data ",result)

        
        return NextResponse.json({ status: 201, app: user_app });
      } else {
        return NextResponse.json({ status: 440 });
      }
    }

    return NextResponse.json({ status: 440 });
  } catch (err) {
    return NextResponse.json({ status: 400 });
  }
};
