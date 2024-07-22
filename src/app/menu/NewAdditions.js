'use client'
import ImageComponent from "../components/image/ImageComponent";
import Image from "next/image";
const NewAdditions = () =>
{

    return(
        <div className="">

            {/* <div className='text-center w-11/12 mx-auto mb-5'>
                <div className='flex items-center justify-between pb-5'>
                <div className='flex-grow border-t border-slate-300'></div>
                <span className='mx-4 text-2xl text-red-800  font-serif'>New Additions</span>
                <div className='flex-grow border-t border-slate-300'></div>
                </div>
                <h1 className='text-black'></h1>
            </div> */}

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