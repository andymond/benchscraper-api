require('dotenv').config();
const Item = require('../../../models/item')
const app = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

describe('/api/v1/items endpoints', function() {
  this.timeout(0)

  before(() => {
    let items = [
      {name: "donuts", price: "$1.30", seller: "Costco"},
      {name: "donuts", price: "$1.65", seller: "Sams Club"},
      {name: "cannoli", price: "$1.24", seller: "BJs"}
    ]

    items.forEach((item) => {
      new_item = new Item(item)
      new_item.save((err) => {
        if (err) throw err;
      })
    })
  })

  after(() => {
    Item.remove({}, (err) => {
      if (err) throw err
    })
  })

  describe('GET /api/v1/items', () => {
    it('returns all items scraped from web', () => {
      return chai.request(app)
        .get('/api/v1/items')
        .then((response) => {
          response.should.have.status(200)
          response.body.should.be.an('array')
          response.body.length.should.eq(3)
          response.body[0].name.should.eq('donuts')
          response.body[1].name.should.eq('donuts')
          response.body[2].name.should.eq('cannoli')
          response.body[0].price.should.eq('$1.30')
          response.body[1].price.should.eq('$1.65')
          response.body[2].price.should.eq('$1.24')
          response.body[0].seller.should.eq('Costco')
          response.body[1].seller.should.eq('Sams Club')
          response.body[2].seller.should.eq('BJs')
        })
        .catch((err) => {
          throw err;
        })
    })
  })

  describe('GET /api/v1/items?name=donuts', () => {
    it('returns items with matching name', () => {
      return chai.request(app)
      .get('/api/v1/items')
      .query({name: 'donuts'})
      .then((response) => {
        response.should.have.status(200)
        response.body.should.be.an('array')
        response.body.length.should.eq(2)
        response.body[0].name.should.eq('donuts')
        response.body[1].name.should.eq('donuts')
        response.body[0].price.should.eq('$1.30')
        response.body[1].price.should.eq('$1.65')
        response.body[0].seller.should.eq('Costco')
        response.body[1].seller.should.eq('Sams Club')
      })
    })

    it('returns items with matching name case insensitive', () => {
      return chai.request(app)
      .get('/api/v1/items')
      .query({name: 'DONUTs'})
      .then((response) => {
        response.should.have.status(200)
        response.body.should.be.an('array')
        response.body.length.should.eq(2)
        response.body[0].name.should.eq('donuts')
        response.body[1].name.should.eq('donuts')
        response.body[0].price.should.eq('$1.30')
        response.body[1].price.should.eq('$1.65')
        response.body[0].seller.should.eq('Costco')
        response.body[1].seller.should.eq('Sams Club')
      })
    })
  })
})
