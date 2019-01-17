//Modules
const {BrowserWindow} = require('electron')

exports.win

exports.createWindow = () =>{

  this.win = new BrowserWindow({
    height : 650,
    width : 500,
    maxHeight : 800,
    maxWidth : 700,
  })

  //Load the URL
  this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  //When close
  this.win.on('closed', ()=>{
    this.win = null;
  })
}
