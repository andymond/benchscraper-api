const Item = require('../models/item')
pry = require("pryjs")

module.exports = class ItemsController {
  static index(req, res, next) {
    Item.find(req.query).sort({'_id': 1}).then((items) => {
      res.json(items)
    })
  }
}
