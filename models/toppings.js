const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
  value: String,
});

const Topping = mongoose.model("Topping", toppingSchema);
module.exports = Topping;
