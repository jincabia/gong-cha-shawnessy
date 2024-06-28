"use client";
import { useRouter } from "next/navigation";


const OurStory = () => {
    const router = useRouter();
    // return (
    //     <main className="flex flex-col text-black min-h-screen items-center text-center pt-72 px-10">
    //         <p className="text-red-800 tracking-widest">OUR STORY</p>
    //         <h1 className="text-4xl font-serif py-5">Brewing happiness</h1>
    //         <button className="bg-red-z800 rounded-md py-2 px-4 text-white shadow-md">READ MORE</button>
    //     </main>
    // );

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/oriento-gy_DN08336U-unsplash.jpg')" }}>
            <main className="flex flex-col items-center justify-center text-white text-center min-h-screen bg-black bg-opacity-50">
                <p className="text-red-800 tracking-widest">OUR STORY</p>
                <h1 className="text-4xl font-serif py-5">Brewing happiness</h1>
                <button className="bg-red-800 rounded-md py-2 px-4 text-white shadow-md" onClick={()=> router.push('/')}>READ MORE</button>
            </main>
        </div>
        
        
    );
};

export default OurStory;

// oriento-gy_DN08336U-unsplash.jpg