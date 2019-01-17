var mongoose = require("mongoose")
var Schema = mongoose.Schema({
  hashvalue : String
})

module.exports = mongoose.model("Product",Schema);
