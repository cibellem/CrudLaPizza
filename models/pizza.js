const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
  name: { type: String },
  toppings: { type: Array },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
