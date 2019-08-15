const puppeteer = require("puppeteer");

exports.scrape = async keyWords => {
  const browser = await puppeteer.launch();
  debugger;

  let data = {};

  keyWords.forEach(async keyword => {
    const page = await browser.newPage();

    page.goto("https://unsplash.com");

    await page.waitForSelector("img", { visible: true });

    await page.type("[name=searchKeyword]", keyword);
    await page.click("[type=submit]");

    await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      const initUrls = [...images].map(image => image.src);

      const filtered = initUrls.filter(
        url =>
          url.includes("images") &&
          !url.includes("profile") &&
          !url.includes("placeholder")
      );

      data[keyword] = filtered[Math.floor(Math.random() * filtered.length)];
    });
  });

  browser.close();

  return data;
};
