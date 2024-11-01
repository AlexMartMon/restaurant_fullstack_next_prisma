"use client";
import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload({image} : {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('')

  return (
    <CldUploadWidget 
    onSuccess={(result, {widget}) => {
        if (result.event === 'success') {
            console.log(result)
            widget.close()
            //@ts-ignore
            setImageUrl(result.info?.secure_url)
        }
    }}
    uploadPreset="zcudtt0b" 
    options={{
        maxFiles: 1,
    }}
    >
      {({open}) => (
        <>
          <div className=" space-y-2">
            <label className="text-slate-800">Product Image</label>
            <div
              className={`relative cursor-pointer hover:opacity-70 transition p-10 
              border-neutral-300 flex flex-col justify-center items-center gap-4 
              text-neutral-600 bg-slate-100`}
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className=" text-lg font-semibold">Add Image</p>
              {imageUrl &&  (
                <div
                    className="absolute inset-0 w-full h-full"
                >
                    <Image 
                        fill
                        style={{objectFit: 'contain'}}
                        src={imageUrl}
                        alt="product_image"
                    />
                </div>
              )}
            </div>
          </div>

              {image && !imageUrl && (
                <div className="space-y-2">
                  <label>Current Image:</label>
                  <div className="relative w-64 h-64">
                    <Image 
                      fill
                      src={getImagePath(image)}
                      alt='product image'
                    />
                  </div>
                </div>
              )}
          <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image}/>
        </>
      )}
    </CldUploadWidget>
  );
}
