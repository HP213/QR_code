// var Product = require('./models/product.js')


// Track items with array
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

// Save items to localstorage
exports.saveItems = () => {
  localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
  // Product.create({
  //   hashValue : "54321"
  // })

}

//Toggle items as selected
exports.selectItem = (e) => {
  $('.read-item').removeClass('is-active')
  $(e.currentTarget).addClass('is-active')
}

//OPen item
window.openItem = () => {

  // Only if items have been added
  if( !this.toreadItems.length ) return

  // Get selected item
  let targetItem = $('.read-item.is-active')

  // Get item's content url (encoded)
  let contentURL = encodeURIComponent(targetItem.data('url'))

  // Get item index to pass to proxy window
  let itemIndex = targetItem.index() - 1

  // Reader window URL
  let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}`

  // Open item in new proxy BrowserWindow
  let readerWin = window.open(readerWinURL, targetItem.data('title'))
}


exports.addItem = (item) =>{
  // Hide 'no items' message
  $('#no-items').hide()


  // New item html
  let itemHTML = `<a class="panel-block read-item" data-item="QR code" data-url="${item}">

                    <h2 class="title is-4 column">${item}</h2>
                  </a>`
  // Apppend to read-list
  $('#read-list').append(itemHTML)

  // Attach select event handler
  $('.read-item')
    .off('click, dblclick')
    .on('click', this.selectItem)
    .on('dblclick', window.openItem)
}
