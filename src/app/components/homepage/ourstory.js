"use client";
import { useRouter } from "next/navigation";

const OurStory = () => {
    const router = useRouter();

    const navToStore = () => {
        router.push("/store");
      };

    return (
        <main className="flex flex-col text-black min-h-screen items-center text-center pt-72 px-10">
            <p className="text-red-800 tracking-widest">OUR STORY</p>
            <h1 className="text-4xl font-serif py-5">Brewing happiness</h1>
            <button className="bg-red-800 rounded-md py-2 px-4 text-white shadow-md" onClick={navToStore}>READ MORE</button>
        </main>
    );
};

export default OurStory;