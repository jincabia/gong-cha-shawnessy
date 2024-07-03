'use client'
import OurStory from './components/homepage/ourstory';
import OurMenu from './components/homepage/ourmenu';
import OurStore from './components/homepage/ourstore';
import { useEffect, useState } from 'react';
import ImageComponent from './components/image/ImageComponent';

export default function Home() {
  return (
    <main className="flex flex-col">
      <OurStory />
      <OurMenu />
      <OurStore />
    </main>
  );
};
