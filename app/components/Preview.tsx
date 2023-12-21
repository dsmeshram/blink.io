import React from "react";
import { Card, Skeleton, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
const Preview = (prop: any) => {
  const { data: session } = useSession();
  const user_image = session?.user?.image as string;
  return (
    <div className=" h-fit  justify-center items-center  flex ">
      <Card className="text-small text-default-400 p-4 space-y-5 max-w-[340px] h-full w-[350px]" radius="lg">
        <div className="max-w-[500px] w-full flex items-center gap-3">
          <User
            name={session?.user?.name}
            description={session?.user?.email}
            avatarProps={{
              src: `${user_image}`,
            }}
          />
        </div>

        {prop.data.length == 0  && (
          <div className="space-y-3">
            <Skeleton isLoaded={prop.isLoaded} className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton isLoaded={prop.isLoaded} className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton isLoaded={prop.isLoaded} className="w-2/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
          </div>
        )}

        {prop.data.length != 0 && <p  className="w-[300px] text-small font-semibold text-default-500">{prop.data}</p >}

        {prop.isImagesloading == false && (
          <Skeleton isLoaded={prop.isLoaded} className="rounded-lg">
            <div className="h-40 rounded-lg bg-secondary"></div>
          </Skeleton>
        )}
      </Card>
    </div>
  );
};

export default Preview;
