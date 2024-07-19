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

    <meta name="google-site-verification" 
    content="jVTFJOBtuYt_NAw45ZXQ9dtejqQsqri4C3inWYHRY4o" />


    <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Gong Cha Shawnessy",
          "url": "https://gongcha-shawnessy.vercel.app/",
          "sameAs": [
            "https://www.instagram.com/gongcha.shawnessy_/",
          ]
        })}
      </script>

      <div>
        <meta property="og:title" content="Gong Cha Shawnessy - Home" />
        <meta property="og:description" content="Welcome to Gong Cha Shawnessy, your go-to place for the best bubble tea." />
        <meta property="og:url" content="https://gongcha-shawnessy.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="instagram:title" content="Gong Cha Shawnessy - Home" />
        <meta name="instagram:description" content="Welcome to Gong Cha, your go-to place for the best bubble tea." />
      </div>


      <title>Gong Cha Shawnessy - Home</title>
        <meta name="description" content="Welcome to Gong Cha Shawnessy, your go-to place for the best bubble tea. Check out our story, menu, and store locations." />
        <meta name="keywords" content="bubble tea,boba, Gong Cha,Gong Cha Calgary,Gong Cha Shawnessy,Gong Cha Canada, menu, store locations, story" />
      <ProgressPopup open={open} handleClose={handleClose} />

      
      <OurStory />
      <OurMenu />
      <OurStore />
    </main>
  );
};
