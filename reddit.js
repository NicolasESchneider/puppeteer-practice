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
    // let links = await self.page.$$('a[classname="title"]');
    const hrefs = await self.page.$$eval('p[class="title"] > a', as => as.map(a => a.href));
    console.log(hrefs.length, elements.length);
    elements.forEach(async (element, i) => {
      let title = await element.$eval(('p[class="title"]'), node => {
        return node.innerText.trim();
      });
      console.log('\n', title, '\n\n', hrefs[i], '\n======');
    });
  },
};

 
export default self;