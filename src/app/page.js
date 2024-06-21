'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

export default function Home() {
  return (
    <main className="flex-grow text-black flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Home Page</h1>
      <div className="flex relative w-11/12 h-1/2 md:w-3/4 md:h-1/2">
        <div className="flex w-full h-full">
          <div className="relative w-1/3 h-full">
            <Image
                layout="fill"
                objectFit="cover"
                src="/Corner.jpg"
                alt="Drink on the Corner"
              />
            
           
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative w-1/3 h-full">
            <Image
              layout="fill"
              objectFit="cover"
              src="/VisitUs.jpg"
              alt="Visit Us"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative w-1/3 h-full">
          <Image
              layout="fill"
              objectFit="cover"
              src="/3Drinks.jpg"
              alt="Stacked Drinks"
            />
          
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" text-white p-4 rounded">
            <h2 className={`font-md`}>Come Visit Us!</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
