const Item = require('../models/item')
pry = require("pryjs")

module.exports = class ItemsController {
  static index(req, res, next) {
    for (var key in req.query) {
      req.query[key] = new RegExp(req.query[key], 'i')
    }

    Item.find(req.query).sort({'_id': 1}).then((items) => {
      res.json(items)
    })
  }
}
