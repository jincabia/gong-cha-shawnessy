import Image from "next/image";
import { Story } from "./story";

export default function OurStory() {
    return (
        <div className="flex flex-col min-h-screen">
            <Story />
            
            <div className="flex-grow flex items-center justify-center">
                <div className="w-10/12 max-w-5xl mx-auto p-4">
                    <div className="relative -z-50">
                        {/* <Image 
                            src="/story.jpg" 
                            alt="Our Story"
                            layout="fill"
                            objectFit="cover"
                        /> */}

                        <Image 
                            src="/story.jpg" 
                            alt="Our Story"
                            width={1024}
                            height={100}
                            objectFit="cover"
                        />

                    </div>

                    <div className="my-8 text-slate-800">
                        <h1 className="text-4xl font-serif mb-4">Our Story</h1>

                        <p className="text-sm mb-4">
                            Gong cha was established in 1996, Taiwan. With many years of skills and expertise developed by founder Wu, Gong cha became one of the world’s fastest growing tea brands, offering high quality beverages at more than 1,650 locations in 20 destinations around the world.
                        </p>

                        <p className="text-sm mb-4">
                            Gong cha brews four types of classic tea: Black tea, Green tea, Oolong tea, and Earl Grey tea. Using only loose leaf tea leaves, these teas are brewed at just the right temperature for just the right amount of time. Because each type of tea has its own unique brewing process, precision is essential in order to extract the different taste profiles of each tea to ensure the best quality and flavour. Gong cha offers a wide selection of the very best toppings, including pearls and various jellies, to pair with these teas.
                        </p>

                        <p className="text-sm">
                            Gong cha ensures that all drinks are served at their freshest by brewing new batches of tea and pearls every four hours. This commitment to excellence ensures that Gong cha is always brewing happiness wherever we serve our customers.
                        </p>
                    </div>
                </div>
            </div>

            
        </div>
    );
}
