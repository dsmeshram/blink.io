import React, { ChangeEvent, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  Spinner,
} from "@nextui-org/react";

const MediaGallery = (prop: any) => {
  const media_list = [
    { id: 100, img: "", type: 0, title: "ADD NEW" },
    { id: 100, img: "", type: 0, title: "IMAGE" },
    { id: 100, img: "", type: 0, title: "IMAGE" },
    { id: 100, img: "", type: 0, title: "IMAGE" }
  ];
  const [uploading, setUploding] = React.useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploding(true);
    const fileInput = e.target;
    if (!fileInput.files) {
      setUploding(false);
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      setUploding(false);
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("Authorization") as string, // Add any other headers as needed
        },
        body: formData,
      });

      if (!res.ok) {
        alert("prob");
      }

      const data = await res.json();
      if (data.status == 201) {
        6;
        media_list.push({ id: 200, type: 0, title: "image data", img: "" });
        prop.onImageChange(data.img_ref);
        setUploding(false);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      setUploding(false);
    }
  };

  const handleClick =(e: any) => {
    e.preventDefault();
      if(inputRef.current){
        inputRef.current?.click();
      }
  }

  return (
    <>
      <div className="gap-2 flex w-full ">
        {media_list.map((item, index) => (
          <Card
            className="bg-slate-100  w-20"
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              {uploading == true && <Spinner size="lg" />}

              {item.title === "ADD NEW" && (
                <div className="h-full w-full">
                  <Button
                    className="h-20 w-6"
                    onClick={(e: any) => handleClick(e)}
                  >
                    ADD NEW
                  </Button>

                  <input
                    ref={inputRef}
                    hidden
                    type="file"
                    className="bg-transparent p-2 border-transparent border-0 h-full"
                    onChange={onImageFileChange}
                  />
                </div>
              )}

              {item.title != "ADD NEW" && 
              <div className="flex justify-center text-center h-full ">
               {item.title}
              </div>}
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MediaGallery;
