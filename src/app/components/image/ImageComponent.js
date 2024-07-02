'use client';
import { useEffect, useState } from "react";
import { storage, ref, getDownloadURL } from "@/app/_utils/firebase";
import Image from "next/image";

const ImageComponent = ({ imagePath }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [imagePath]);

  return (
    <div className="w-36 h-48 flex items-center justify-center">
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={144}
          height={192}
          className="object-contain"
          alt={imagePath}
          priority
        />
      ) : (
            <div className="spinner" style={{ width: 100, height: 100 }}></div>
      )}
    </div>
  );
};

export default ImageComponent;


