import reddit from './reddit.js';
const gotoReddit = async (sr) => {

  await reddit.init(sr);

  let results = await reddit.getResults(10);
}


gotoReddit('askreddit');