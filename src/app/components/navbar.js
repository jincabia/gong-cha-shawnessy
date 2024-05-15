import Image from "next/image";


// This is gonna be the nav bar

export default function GongNav()
{
    return(
        <main className="flex justify-between items-center">

            <Image src={'/logoWithTagline.png'} width={175} height={175} className="p-2"/>
            <Image src={'/hamburgvector.png'} width={50} height={50} className="pr-5"/>

        </main>
    );
}