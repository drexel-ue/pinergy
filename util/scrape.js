const puppeteer = require("puppeteer");

exports.scrape = async keyWords => {
  // debugger;
  const browser = await puppeteer.launch();
  // debugger;

  const page = await browser.newPage();
  // debugger;

  page.goto("https://unsplash.com");
  // debugger;
  let data;

  if (!keyWords) {
    // debugger;
    await page.waitForSelector("img", { visible: true });

    data = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      // debugger;
      return [...images].map(image => image.src);
    });
    debugger
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

  debugger;

  return data;
};
