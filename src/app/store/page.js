import Image from "next/image";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import('./map'), { ssr: false });

export default function Store() {
    return (
        <main className="flex flex-col items-center">
            <p className="text-red-800 tracking-widest pt-20">OUR STORE</p>
            <h1 className="font-serif text-4xl text-stone-800 py-3">Find us at</h1>
            <div className="w-2/2">
                <Image 
                    src="/store.jpg" 
                    alt="Our Store"
                    width={1024}
                    height={100}
                    objectFit="cover"
                />
            </div>
            <div className="w-full mt-10">
                <MapComponent />
            </div>
        </main>
    );
}
