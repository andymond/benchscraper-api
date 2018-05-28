const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE)
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {type: String, required: true},
  price: String,
  seller: {type: String, required: true},
  created_at: Date,
  updated_at: Date
});

itemSchema.pre('save', () => {
  var currentDate = new Date
  this.updated_at = currentDate

  if (!this.created_at) {
    this.created_at = currentDate
  }

  next();
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
