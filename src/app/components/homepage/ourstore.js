"use client";
import { useRouter } from "next/navigation";

const OurStore = () => {
    const router = useRouter();

    const navToStore = () => {
        router.push("/store");
    };
    // return (
    //     <main className="flex flex-col items-center text-center text-black min-h-screen pt-64 px-10">
    //         <p className="text-red-800 tracking-widest">OUR STORE</p>
    //         <h1 className="text-4xl font-serif py-5">Drop by to pick up your drink!</h1>
    //         <button className="bg-red-800 rounded-md py-2 px-4 text-white shadow-md">VIEW MORE</button>
    //     </main>
    // );

    return (
        <div className="min-h-screen bg-cover bg-bottom" style={{ backgroundImage: "url('/Tea-25-scaled.jpg')" }}>
            <main className="flex flex-col items-center justify-center text-white text-center min-h-screen bg-black bg-opacity-50">
                <p className="text-red-800 tracking-widest">OUR STORE</p>
                <h1 className="text-3xl font-serif py-5">Drop by to pick up your drink!</h1>
                <button className="bg-red-800 rounded-md py-2 px-4 text-white shadow-md" onClick={navToStore}>VIEW MORE</button>
            </main>
        </div>
    );
};

export default OurStore;