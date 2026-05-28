/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://mermad.com.tr",
  generateRobotsTxt: true,
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/hakkimizda"),
    await config.transform(config, "/faaliyetler"),
    await config.transform(config, "/projeler"),
    await config.transform(config, "/iletisim"),
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: ["https://mermad.com.tr/sitemap.xml"],
  },
};
