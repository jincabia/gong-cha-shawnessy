'use client'
import ImageComponent from "../components/image/ImageComponent";
import Image from "next/image";
const NewAdditions = () =>
{

    return(
        <div className="mt-10">

            <div className='text-center w-11/12 mx-auto'>
                <div className='flex items-center justify-between pb-5'>
                <div className='flex-grow border-t border-slate-300'></div>
                <span className='mx-4 text-2xl text-red-800  font-serif'>New Additions</span>
                <div className='flex-grow border-t border-slate-300'></div>
                </div>
                <h1 className='text-black'></h1>
            </div>

            <div className="mx-auto text-center justify-center w-9/12 ">
                <Image
                    src="/FF17.png"
                    layout="responsive"
                    objectFit="contain"
                    width={300}
                    height={300}
                    alt="Final Fantasy Collab"
                    priority
                />
            </div>


            

        </div>
    )
}

export default NewAdditions;