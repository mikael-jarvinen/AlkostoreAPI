const puppeteer = require('puppeteer')
const scrapers = require('./scrapers')
const getDrinks = require('./drinks')

const beerUrl = 'https://alkostore24.com/fi/bier.html'
const ciderUrl = 'https://alkostore24.com/fi/cider.html'
const spiritUrl = 'https://alkostore24.com/fi/spirituosen.html'
const effervescentUrl = 'https://alkostore24.com/fi/schaumweine.html'
const boxWineUrl = 'https://alkostore24.com/fi/bag-in-box-weine.html'
const wineUrl = 'https://alkostore24.com/fi/weine.html'
const veganWineUrl = 'https://alkostore24.com/fi/bio-weine.html'

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const beer = await getDrinks(page, beerUrl)
  const cider = await getDrinks(page, ciderUrl)
  const spirit = await getDrinks(page, spiritUrl)
  const effervescent = await getDrinks(page, effervescentUrl)
  const boxWine = await getDrinks(page, boxWineUrl)
  const wine = await getDrinks(page, wineUrl)
  const veganWine = await getDrinks(page, veganWineUrl)

  const all = [
    ...beer, 
    ...cider, 
    ...spirit, 
    ...effervescent, 
    ...boxWine,
    ...wine,
    ...veganWine
  ]
  all.sort((a, b) => {
    if (a.KAVI > b.KAVI) {
      return 1
    } else if (a.KAVI < b.KAVI || a.KAVI === null) {
      return -1
    } else {
      return 0
    }
  })
  console.log(all.slice(all.length - 10))
  browser.close()
}

scrape()