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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Grow } from "@mui/material";



export default function GongNav() {
  const [hidden, setHidden] = useState(false);

  const {user,signOut} = useAuth();

  const router = useRouter();

  const navToHome = () => {
    router.push("/");
  };

  const navToStory = () => {
    router.push("/story")
  }

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
    <header className="bg-white fixed top-0 left-0 w-full lg:z-10 z-40">
        {/* Mobile Nav bar */}
      {hidden ? (


        <div
          className={`fixed inset-0 z-10${
            hidden ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 ease-in-out bg-white max-h-screen max-x-screen`}
        >
          

          {/* Button to close the nav bar */}
          <div className="flex justify-between mt-5">

          <Image
              src="/GongchaLogo.png"
              width={50}
              height={50}
              className="text-start justify-start items-start ml-3"
              alt="Gong Cha"
              onClick={()=> router.push('/')}
              priority
              style={{ width: 'auto', height: '50px' }} // inline style to maintain aspect ratio
            />

            

            <div className="text-end justify-end items-end mr-5">
              <button className="" onClick={toggleHidden}>
                <CloseIcon sx={{ color: grey[900], fontSize:40}}/>
              </button>
            </div>





          </div>

          <Grow in={hidden}>

            <div className="grid justify-items-start text-black">

            {/* <div className="flex pl-5 py-5 space-x-5 h-32 mx-auto w-screen border-b border-slate-200" onClick={()=>handleNavigation('/')}>
              <HomeIcon className=""/>
              <h1 className="text-stone-900 w-full " >
                  Home
              </h1>

            </div> */}

            <div
              className="flex items-center justify-start pl-5 py-5 space-x-5 h-24 mx-auto w-screen border-b border-slate-200"
              onClick={() => handleNavigation('/')}
            >
              <HomeIcon className=""/>
              <h1 className="text-stone-900">
                Home
              </h1>
            </div>
  {/*             

              <h1 className="text-stone-900 w-screen border-b border-black pl-5 py-5" onClick={()=>handleNavigation('/')}>
                  Home
              </h1> */}

              <div className="flex items-center justify-start pl-5 py-5 space-x-5 h-24 mx-auto w-screen border-b border-slate-200" onClick={()=>handleNavigation('/story')}>
                <AutoStoriesIcon className=""/>
                  <h1 className="text-stone-900 w-full " >
                      Our Story
                  </h1>

              </div>


              


              <div className="flex items-center justify-start pl-5 py-5 space-x-5 h-24 mx-auto w-screen border-b border-slate-200" onClick={()=>handleNavigation('/menu')}>
                <MenuBookIcon className=""/>
                <h1 className="text-stone-900 w-full " >
                    Our Menu
                </h1>

              </div>

              <div className="flex items-center justify-start pl-5 py-5 space-x-5 h-24 mx-auto w-screen border-b border-slate-200" onClick={()=>handleNavigation('/store')}>
                <MapIcon className=""/>
                <h1 className="text-stone-900 w-full " >
                    Our Store
                </h1>

              </div>
  {/* 
              <h1 className="text-stone-900 w-screen border-b border-black pl-5 py-5" onClick={()=>handleNavigation('/store')}>
                  Our Store
              </h1> */}

              {user && (
                <>

              <div className="flex items-center justify-start pl-5 py-5 space-x-5 h-24 mx-auto w-screen border-b border-slate-200" onClick={()=>handleNavigation('/cart')}>
                <ShoppingCartIcon className=""/>
                <h1 className="text-stone-900 w-full " >
                    Your Cart
                </h1>

              </div>
                </>)}


                {/* If the user is not authenticated, and they attempt to check their cart
                    it sends them to sign in using google
                */}
              {!user && (
                <>
              <div className="flex items-center justify-start pl-5 py-5 space-x-5 h-24 mx-auto w-screen border-b border-slate-200" onClick={()=>handleNavigation('/signin')}>
                <AccountBoxRoundedIcon className="" sx={{ color: grey[900] }}/>
                <h1 className="text-stone-900 w-full " >
                    Login/Signup
                </h1>

              </div>
                
                </>
              )}

              {user && (
                <div className="flex items-center justify-start pl-5 py-5 space-x-5 h-24 mx-auto w-screen border-b border-slate-200" onClick={signOut}>
                <LogoutRoundedIcon className="" sx={{ color: grey[900] }}/>
                <h1 className="text-stone-900 w-full " >
                    Sign Out
                </h1>

              </div>
              )}


            </div>

          </Grow>






          
        </div>
      ) :
    //   Desktop nav
      (
        <div className="flex justify-between items-center shadow-md ">
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
              className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800"
              onClick={navToHome}>
                      Home
            </button>
            <button 
              className="text-stone-900 py-2 px-4 w-fit rounded-md hover:text-white hover:bg-red-800"
              onClick={navToStory}>
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
            <button onClick={()=>router.push('/cart')}>
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
