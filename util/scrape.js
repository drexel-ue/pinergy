const puppeteer = require("puppeteer");

exports.scrape = async keyWord => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    await page.goto("https://unsplash.com");

    await page.type("[name=searchKeyword]", keyWord);
    await page.click("[type=submit]");

    await page.waitForSelector("img", { visible: true });

    const data = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      const initUrls = [...images].map(image => image.src);
      const filtered = initUrls.filter(
        url =>
          url.includes("images") &&
          !url.includes("profile") &&
          !url.includes("placeholder")
      );

      return filtered[Math.floor(Math.random() * filtered.length)];
    });

    browser.close();

    return data;
  } catch (e) {
    browser.close();
    return e.toString();
  }
};
