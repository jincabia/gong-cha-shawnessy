'use client'
import ImageComponent from "../components/image/ImageComponent";
import Image from "next/image";
const NewAdditions = () =>
{

    return(
        <div className="">

            <div className="mx-auto text-center justify-center  " >
                <Image
                    src="/Final-Fantasy_TV_EN-H-no-price.jpg"
                    layout="responsive"
                    objectFit="contain"
                    width={200}
                    height={200}
                    alt="Final Fantasy Collab"
                    priority
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>


            

        </div>
    )
}

export default NewAdditions;