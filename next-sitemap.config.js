/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://gongcha-shawnessy.vercel.app/',
    generateRobotsTxt: true, // (Optional) Generate a robots.txt file
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: [''], // Optional: Exclude specific pages
    robotsTxtOptions: {
      additionalSitemaps: [
        // 'https://yourwebsite.com/sitemap-0.xml', // If you have additional sitemaps
      ],
    },
  };
  