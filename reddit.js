import puppeteer from 'puppeteer';

const SUBREDDIT_URL = (subreddit) => `https://old.reddit.com/r/${subreddit}`;

const self = {
  browser: null,
  page: null,
  init: async (subreddit) => {
    // console.log(init);
    self.browser = await puppeteer.launch({
      headless: false,
    });
    self.page = await self.browser.newPage();

    // go to the subreddit
    await self.page.goto(SUBREDDIT_URL(subreddit, { waitUntil: 'networkidle0' }));
  },
  getResults: async (nr) => {
    let elements = await self.page.$$('#siteTable > div[class*="thing"]');
    for (let element of elements) {
      let title = await element.$eval(('p[class="title"]'), node => node.innerText.trim());
      console.log(title);
    }

  }
}

 
export default self;