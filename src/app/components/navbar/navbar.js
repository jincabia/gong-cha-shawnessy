'use client'
import Image from "next/image";
import { useState } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { grey, red } from "@mui/material/colors";
import { useRouter } from "next/navigation";

export default function GongNav() {
  const [hidden, setHidden] = useState(false);
  const router = useRouter();


  const toggleHidden = () => {
    setHidden((prevState) => !prevState);
  };

  const handleNavigation = (path) => {
    toggleHidden();
    router.push(path)
  }

  return (
    <main className="bg-white">
        {/* Mobile Nav bar */}
      {hidden ? (
        <div
          className={`fixed inset-0 ${
            hidden ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 ease-in-out bg-white max-h-screen max-x-screen`}
        >
          <div className="text-end">
            <button onClick={toggleHidden}>
              <Image src="/close.png" width={60} height={60} alt="Exit button" className="pr-5 pt-5" />
            </button>
          </div>
          {/* router.push(`/menu/${id}`); */}

          <div className="text-center content-center justify-center bg-white w-full mx-auto m-4">
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4">
              Our Story
            </h1>
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4">
              Our Menu
            </h1>
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4">
              Our Philosophy
            </h1>
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4">
              Our Tea
            </h1>
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4">
              Our Location
            </h1>
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4">
              Contact Us
            </h1>
          </div>
        </div>
      ) :
    //   Desktop nav
      (
        <div className="flex justify-between items-center shadow-md">
          <div className="justify-start">
            <Image
              src="/logoWithTagline.png"
              width={175}
              height={175}
              className="p-7"
              alt="Gong Cha"
            />
          </div>

          <button onClick={toggleHidden} className="md:hidden">
            <Image
              src="/hamburgvector.png"
              width={50}
              height={50}
              className="pr-5"
              alt="Menu"
            />
          </button>

          <div className="hidden md:flex space-x-10">
            <button className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800">Our Story</button>
            <button className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800">Our Menu</button>
            <button className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800">Our Philosophy</button>
            <button className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800">Our Tea</button>
            <button className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800">Our Location</button>
            <button className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800">Contact Us</button>
          </div>

          <div className="hidden md:flex space-x-10 pr-10">
            <ShoppingCartOutlinedIcon className="hover:bg-stone-200 rounded-md" sx={{ color: grey[900] }}/>
            <AccountCircleOutlinedIcon className="hover:bg-stone-200 rounded-md" sx={{ color: grey[900] }}/>
          </div>
        </div>
      )}
    </main>
  );
}
