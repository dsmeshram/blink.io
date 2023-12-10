import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserApps } from "@/prisma/userapps";

export const POST = async (req: NextRequest, res: Response) => {
  try {
    const user: any = jwt.verify(
      req.headers.get("Authorization") as string,
      process.env.JWT_SECRET as string
    );
    const user_apps = await getUserApps(user.id);
    const app = user_apps[0];
    if (true) {
      const datais = JSON.parse(app?.metadata?.other);
      const uplodimage_url = await fetch(
        "https://api.linkedin.com/v2/assets?action=registerUpload",
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${app?.metadata?.access_token as string}`, // Add any other headers as needed
          },
          body: JSON.stringify({
            registerUploadRequest: {
              owner: `urn:li:person:${datais.id as string}`,
              recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
              serviceRelationships: [
                {
                  identifier: "urn:li:userGeneratedContent",
                  relationshipType: "OWNER",
                },
              ],
              supportedUploadMechanism: ["SYNCHRONOUS_UPLOAD"],
            },
            
          }),
        }
      );

      const result = await uplodimage_url.json();

      console.log("result",result)

      if (result.value) {

        console.log("result 100 ==",result.value.uploadMechanism[
          "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ])
        const upload_url =
          result.value.uploadMechanism[
            "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
          ].uploadUrl;

        console.log("upload_url ",upload_url)
        // result.value.asset[
        //   "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        // ];
        const formData = await req.formData();
        let body = Object.fromEntries(formData);
        const file = body.file as Blob | null;

        console.log(body.file)

        console.log("file", file);

        // const attach_File = new File([],`/tmp/${file.name}.png`)
        // const buffer = Buffer.from(await file.arrayBuffer())
        const uplodimage = await fetch(upload_url, {
          method: "PUT",

          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${app?.metadata?.access_token as string}`, // Add any other headers as needed
          }, // or 'POST', 'PUT', etc.
          body:file 
        });

        const result_up = uplodimage.status

        console.log("uplod ..." ,uplodimage.status == 201);

        return NextResponse.json({ status: 200, data: result.value });
      }
    }
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log("common events", err);
    return NextResponse.json({ status: 400 });
  }
};
