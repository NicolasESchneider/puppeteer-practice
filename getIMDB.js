const puppeteer = require('puppeteer');

const scrapeIMDBMovie = async (url) => {

  const browser = await puppeteer.launch({
    // headless: false
  });
  // headless allows you to actually see the browser open and running;
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });
  const data = await page.evaluate(() => {
    const title = document.querySelector('.title_wrapper > h1').innerText;
    const rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
    const ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;
    return {
      title,
      rating,
      ratingCount
    };
  });
  console.log(data);
  await browser.close();
};

scrapeIMDBMovie('https://www.imdb.com/title/tt0084787/');
scrapeIMDBMovie('https://www.imdb.com/title/tt1431045/?ref_=hm_inth_1');
