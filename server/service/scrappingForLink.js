const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getUrl = text => {
  const match = text.match(/\bhttps?:\/\/\S+/gi);
  if (!match) {
    return '';
  }
  return match[0];
};
const fetchHtml = async url => {
  const response = await fetch(url);
  const html = response.text();
  return html;
};
const scrapeExtraInfo = html => {
  const $ = cheerio.load(html);
  const title = $('title').text();
  const description = $('meta[name="description"]').attr('content');
  return { title, description };
};

const getExtraInfoFromMessage = async text => {
  const url = getUrl(text);

  if (!url) {
    return {};
  }
  const html = await fetchHtml(url);

  return { ...scrapeExtraInfo(html), url };
};

module.exports = {
  getExtraInfoFromMessage,
};
