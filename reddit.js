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
    let links = await self.page.$$('a[classname="title"]');
    elements.forEach(async (element) => {
      console.log(links.length);
      let title = await element.$eval(('p[class="title"]'), node => {
        console.log(node);
        node.innerText.trim();
      });
      console.log(title);
    });
  },
};

 
export default self;