const puppeteer = require("puppeteer");

exports.scrape = async keyWords => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  page.goTo("https://unsplash.com");

  let data;

  if (keyWords.length === 0) {
    await page.waitForSelector("img", { visible: true });

    data = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      return Array.from(images.map(image => image.src));
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
