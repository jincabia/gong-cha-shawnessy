'use client'
import OurStory from './components/homepage/ourstory';
import OurMenu from './components/homepage/ourmenu';
import OurStore from './components/homepage/ourstore';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <main className="flex flex-col">
      <OurStory />
      <OurMenu />
      <OurStore />
    </main>
  );
};
