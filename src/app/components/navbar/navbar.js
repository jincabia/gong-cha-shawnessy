'use client';
import Image from "next/image";
import { useState } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { grey, red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/authContext/AuthContext";

// TODO Start filling up pages

export default function GongNav() {
  const [hidden, setHidden] = useState(false);

  const {user} = useAuth();

  const router = useRouter();

  const navToHome = () => {
    router.push("/");
  };

  const navToMenu = () => {
    router.push("/menu");
  };

  const navToStore = () => {
    router.push("/store");
  };

  const navToSignIn =() => {
    router.push("/signin")
  }

  // Only for mobile
  const toggleHidden = () => {
    setHidden((prevState) => !prevState);
  };

  // Navigation method only for mobile
  const handleNavigation = (path) => {
    toggleHidden();
    router.push(path)
  }

  return (
    <header className="bg-white fixed top-0 left-0 w-full">
        {/* Mobile Nav bar */}
      {hidden ? (
        <div
          className={`fixed inset-0 ${
            hidden ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 ease-in-out bg-white max-h-screen max-x-screen`}
        >
          <div className="text-end">
            <button className="pr-5 pt-5" onClick={toggleHidden}>
              <CloseIcon sx={{ color: grey[900], fontSize: 40 }}/>
            </button>
          </div>

          <div className="text-center content-center justify-center bg-white w-full mx-auto m-4">
          <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4" onClick={()=>handleNavigation('/')}>
              Home
            </h1>
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4" onClick={()=>handleNavigation('/menu')}>
              Our Menu
            </h1>
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4" onClick={()=>handleNavigation('/store')}>
              Our Store
            </h1>

          {user && (<>
            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4" onClick={()=>handleNavigation('/cart')}>
              Your Cart
            </h1>          
          </>)}


          </div>
        </div>
      ) :
    //   Desktop nav
      (
        <div className="flex justify-between items-center shadow-md">
          <button className="justify-start" onClick={navToHome}>
            <Image
              src="/logoWithTagline.png"
              width={175}
              height={175}
              className="p-7"
              alt="Gong Cha"
              onClick={()=> router.push('/')}
              priority
            />
          </button>

          <button onClick={toggleHidden} className="md:hidden pr-5">
            <MenuIcon sx={{ color: grey[900], fontSize: 40 }}/>
          </button>

          <div className="hidden md:flex space-x-10">
            <button 
              className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800">
                      Our Story
            </button>
            <button 
              className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800" 
              onClick={navToMenu}>
                      Our Menu
            </button>
            <button 
              className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800" 
              onClick={navToStore}>
                      Our Store
            </button>
          </div>

          <div className="hidden md:flex space-x-10 pr-10">
            <button>
              <ShoppingCartOutlinedIcon className="hover:bg-stone-200 rounded-md" sx={{ color: grey[900] }}/>
            </button>
            <button onClick={navToSignIn}>
              <AccountCircleOutlinedIcon className="hover:bg-stone-200 rounded-md" sx={{ color: grey[900] }}/>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
