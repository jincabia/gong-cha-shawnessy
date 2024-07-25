'use client';
import { useEffect, useState } from "react";
import { storage, ref, getDownloadURL } from "@/app/_utils/firebase";
import Image from "next/image";


// This helps read images from the firebase storage
// Pass in the imagePath aka {drinkName}.png
const ImageComponent = ({ imagePath,doneLoading = null }) => {
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


  const handleDoneLoading = () =>
  {
    if(imageUrl)
    {
      doneLoading(false);
    }
  }

  useEffect(()=>
  {
    handleDoneLoading();
  },[imageUrl]
  )

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
          style={{ width: 'auto', height: '192px' }} // inline style to maintain aspect ratio
        />
      ) : (
            <div className="spinner" style={{ width: 100, height: 100 }}></div>
      )}
    </div>
  );
};

export default ImageComponent;


