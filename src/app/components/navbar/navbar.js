'use client'
import Image from "next/image";
import { useState } from "react";
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
    <main className="bg-white-500">
        {/* Mobile Nav bar */}
      {hidden ? (
        <div
          className={`fixed inset-0 ${
            hidden ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 ease-in-out bg-white max-h-screen max-x-screen`}
        >
          <div className="text-end">
            <button onClick={toggleHidden}>
              <Image src="/close.png" width={40} height={40} alt="Exit button" />
            </button>
          </div>
          {/* router.push(`/menu/${id}`); */}

          <div className="text-center content-center justify-center bg-gray-400 w-2/5 mx-auto m-4">
            <h1 className="text-black w-fit mx-auto mb-4 border-b-2 border-slate-300" onClick={() => handleNavigation('/')}>
              Home
            </h1>
            <h1 className="text-black w-fit mx-auto mb-4 border-b-2 border-slate-300" onClick={() => handleNavigation('/menu')}>
              Menu 
            </h1>
            <h1 className="text-black w-fit mx-auto mb-4 border-b-2 border-slate-300">
              Order Not done
            </h1>
            <h1 className="text-black w-fit mx-auto mb-4 border-b-2 border-slate-300">
              Where to find us! Not done
            </h1>
            <h1 className="text-black w-fit mx-auto mb-4 border-b-2 border-slate-300">
              Account Not done
            </h1>
          </div>
        </div>
      ) :
    //   Desktop nav
      (
        <div className="flex justify-between items-center border-b-2 border-opacity-50 border-gray-400">
          <div className="justify-start">
            <Image
              src="/logoWithTagline.png"
              width={175}
              height={175}
              className="p-2"
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
            <h1 className="text-black w-fit">Home</h1>
            <h1 className="text-black w-fit">Menu</h1>
            <h1 className="text-black w-fit">Order</h1>
            <h1 className="text-black w-fit">Where to find us!</h1>
          </div>

          <div className="hidden md:flex space-x-10 pr-10">
            <Image src="/account.png" width={30} height={30} alt="Account" />
            <Image src="/cart.png" width={45} height={5} alt="Cart" />
          </div>
        </div>
      )}
    </main>
  );
}
