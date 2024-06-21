"use client";
import { useRouter } from "next/navigation";

const OurMenu = () =>  {
    const navToMenu = () => {
        router.push("/menu");
      };

    const router = useRouter();

    return (
        <main className="flex flex-col items-center text-black text-center min-h-screen pt-64 px-10">
            <p className="text-red-800 tracking-widest">OUR MENU</p>
            <h1 className="text-4xl font-serif py-5">Discover all we have to offer</h1>
            <button className="bg-red-800 rounded-md py-2 px-4 text-white shadow-md" onClick={navToMenu}>VIEW MENU</button>
        </main>
    );
};

export default OurMenu;