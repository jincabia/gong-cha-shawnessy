import DrinksList from "../components/drinks/drinksList";
import Image from "next/image";

export default function Menu() {



  
  return (
    <main className="flex-grow">
      {/* Show some ads here lol */}
      {/* <div className="pt-5 pb-10">
        <Image
          src="/MangoSeries.png"
          layout="responsive"
          width={1000}  // The intrinsic width of the image
          height={1000} // The intrinsic height of the image
          alt="New Pineapple Drinks"
          className="w-full "
        />

      </div> */}
     



      <DrinksList/>
      {/* <ImageComponent imagePath={'Brown Sugar MT with Pearls.png'}/> */}

    </main>
  );
}
