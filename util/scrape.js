const puppeteer = require("puppeteer");

exports.scrape = async url => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector("img", { visible: true });

    const data = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      let urls = [...images].map(image => image.src);
      if (urls.length > 10) urls = urls.slice(0, 10);
      return urls;
    });

    browser.close();

    return data.slice(1);
  } catch (e) {
    browser.close();
    return e.toString();
  }
};
