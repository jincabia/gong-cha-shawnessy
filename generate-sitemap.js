const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Define your site URLs here
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/story', changefreq: 'weekly', priority: 0.8 },
  { url: '/menu', changefreq: 'weekly', priority: 0.8 },
  { url: '/store', changefreq: 'weekly', priority: 0.8 },
];

(async () => {
  // Create a sitemap stream
  const sitemap = new SitemapStream({ hostname: 'https://gongcha-shawnessy.vercel.app' });

  // Write the stream to a file
  const writeStream = createWriteStream(path.join(__dirname, 'public', 'sitemap.xml'));

  sitemap.pipe(writeStream);

  links.forEach(link => sitemap.write(link));
  sitemap.end();

  await streamToPromise(sitemap);

  console.log('Sitemap generated successfully!');
})();
