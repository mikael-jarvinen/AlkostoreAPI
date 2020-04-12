const puppeteer = require('puppeteer')
const scrapers = require('./scrapers')

const url = 'https://alkostore24.com/fi/cider.html'

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })
  let beer = []
  do {
    const result = await scrapers.pageScrape(page)
    beer = beer.concat(...result)
  }
  while (await scrapers.nextPage(page))
  
  console.log(beer)
  browser.close()
}

scrape()