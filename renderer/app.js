const items = require('./item.js')
var md5 = require('md5');
//Adding mongoose module
var mongoose = require("mongoose")

//Connecting to mongoose
mongoose.connect("mongodb://localhost/qr_code")

var qrcodeSchema = new mongoose.Schema({
  hashValue : String
})

var qrcodeData = mongoose.model("qrcodeData", qrcodeSchema)

qrcodeData.create({
  hashValue : "324"
})

//On click on add item button
$('.open-add-modal').click(()=>{
  $('#add-modal').addClass('is-active')
})

//On cancel button
$('.close-add-modal').click(()=>{
  $('#add-modal').removeClass('is-active')
})

//Handle add button

$('#add-button').click(()=>{

  //check if all fields are filled
  let itemName = $('#item-input').val()
  let itemBatch = $('#batch-input').val()
  let itemNo = $('#number-input').val()
  let itemQty = $('#qty-input').val()
  if(itemName && itemBatch && itemNo && itemQty){
    console.log(itemName);
    $('#add-modal').removeClass('is-active')
    var date = new Date();
    var n = date.getTime();
    // console.log(n);
    // console.log(md5(itemName + itemBatch + itemNo + itemQty));
    var i

    for(i = 1; i <= itemNo; i++){
        let item = md5((itemName + itemBatch + itemNo + itemQty + i + n))
        // console.log(item);

        // Add item to items array
      items.toreadItems.push(item)

      // Save items
      items.saveItems()

      // Add item
      items.addItem(item)

      if(items.toreadItems.length === 1)
      $('.read-item:first()').addClass('is-active')
    }
  }
})

//use of enter key

$('#item-input').keyup((e)=>{
  if(e.key === 'Enter') $('#add-button').click()
})
$('#batch-input').keyup((e)=>{
  if(e.key === 'Enter') $('#add-button').click()
})
$('#number-input').keyup((e)=>{
  if(e.key === 'Enter') $('#add-button').click()
})
$('#qty-input').keyup((e)=>{
  if(e.key === 'Enter') $('#add-button').click()
})

// Add items when app loads
if(items.toreadItems.length){
  items.toreadItems.forEach(items.addItem)
  $('.read-item:first()').addClass('is-active')
}
