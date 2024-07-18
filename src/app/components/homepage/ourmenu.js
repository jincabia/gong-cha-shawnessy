"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";


// Individual Component for the Menu Page
const OurMenu = () => {
    const router = useRouter();

    const navToMenu = () => {
        router.push("/menu");
    };

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/aniketh-kanukurthi-Qaor6nxikUM-unsplash.jpg')" }}>
            <main className="flex flex-col items-center justify-center text-white text-center min-h-screen bg-black bg-opacity-50">
                <p className="text-red-800 tracking-widest">OUR MENU</p>
                <h1 className="text-4xl font-serif py-5">Discover all we have to offer</h1>
                <button className="bg-red-800 rounded-md py-2 px-4 text-white shadow-md" onClick={navToMenu}>VIEW MENU</button>
            </main>
        </div>
    );
};

export default OurMenu;
