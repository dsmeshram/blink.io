import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserApps } from "@/prisma/userapps";

export async function POST(req: NextRequest, res: Response) {
  try {
    const user: any = jwt.verify(
      req.headers.get("Authorization") as string,
      process.env.JWT_SECRET as string
    );


    const formData = await req.formData()
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    console.log("form data", file)

    const buffer = Buffer.from(await file.arrayBuffer());

    const user_apps = await getUserApps(user.id);
    const app = user_apps[0];
    if (true) {

      const {others , access_token} = app?.metadata as any
      const datais = JSON.parse(others);

      const uplodimage_url = await fetch(
        "https://api.linkedin.com/v2/images?action=initializeUpload",
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token as string}`, // Add any other headers as needed
          },
          body: JSON.stringify({
            initializeUploadRequest: {
              owner: `urn:li:person:${datais.id as string}`
            },
            
          }),
        }
      );

      const result = await uplodimage_url.json();
      if (result.value) {
        const  image_reference = result.value.image
        const upload_url = result.value.uploadUrl;

        const uplodimage = await fetch(upload_url, {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${access_token as string}`, // Add any other headers as needed
          }, // or 'POST', 'PUT', etc.
          body:buffer 
        });

        if (uplodimage.status === 201)
        {
          return NextResponse.json({ status: 201, data: uplodimage , img_ref : image_reference});
        }else{
          return NextResponse.json({ status: 401});
        }
      }
    }
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log("common events", err);
    return NextResponse.json({ status: 400 });
  }
};
