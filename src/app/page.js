'use client'
import { useEffect, useState } from 'react';
import OurStory from './components/homepage/ourstory';
import OurMenu from './components/homepage/ourmenu';
import OurStore from './components/homepage/ourstore';
import { ProgressPopup } from './components/popup/indevelopment';

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main className="flex flex-col">
      <ProgressPopup open={open} handleClose={handleClose} />
      <OurStory />
      <OurMenu />
      <OurStore />
    </main>
  );
};
