'use client'
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-stone-800 flex flex-col py-10 px-5 w-full items-center text-center print:hidden">
            <Image src="/logowhite.png" 
                   width={150} 
                   height={50}
                   className="pb-3"
                   alt="Gong Cha Logo"
            />
            <p className="text-stone-400 text-sm">GONG CHA GLOBAL LTD ALL RIGHTS RESERVED</p>
            <p className="text-stone-400 text-sm">70 SHAWVILLE BLVD SE #228, CALGARY, AB T2Y 2Z3</p>
            <p className="text-stone-400 text-sm">gongchashawnessy@business.com</p> 
        </footer>
    );
}