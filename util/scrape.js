const puppeteer = require("puppeteer");

exports.scrape = async keyWords => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  page.goto("https://unsplash.com");
  let data;

  if (!keyWords) {
    await page.waitForSelector("img", { visible: true });

    data = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      const initUrls = [...images].map(image => image.src);

      return initUrls.filter(url => url.includes("images") && !url.includes("profile") && !url.includes("placeholder"))
    });
  } else {
    await page.type("[name=searchKeyword]", keyWords.join(" "));
    await page.click("[type=sumbit]");

    await page.waitForSelector("img", { visible: true });

    data = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      return Array.from(images.map(image => image.src));
    });
  }

  browser.close();


  return data;
};
