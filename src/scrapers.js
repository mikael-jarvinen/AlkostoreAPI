const pageScrape = async page => {
  return await await page.evaluate(() => {
    const rows = document
      .querySelectorAll('.products-grid.row')
    let listItems = []
    Array.from(rows).forEach(row => {
      const items = row.querySelectorAll('li')
      const array = Array.from(items)
      listItems = listItems.concat(...array)
    })
  
    return listItems.map(item => item.innerText)
  })
}

const nextPage = async page => {
  try {
    await page.evaluate(() => {
      document.querySelector('.next.i-next').click()
    })
    await page.waitForNavigation()
    return true
  } catch (e) {
    return false
  }
}

module.exports = { pageScrape, nextPage }