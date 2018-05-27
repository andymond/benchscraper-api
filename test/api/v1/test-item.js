require('dotenv').config();
const Item = require('../../../models/item')
const app = require('app');
const chai = require('chai');
const should = chai.should();

describe('Item model', () => {

  afterEach((done) => {
    Item.remove()
    .then(() => done())
    .catch((error) => {
      throw error
    })
    .done();
  });

  it('can create a new item', () => {
    let attrs = {
      name: "pear",
      price: "$10",
      seller: "Costco"
    }
    let item = new Item(attrs)

    (item.save).should.eq(attrs)
    Item.find().should.eq([attrs])
  })
  .catch((error) => {
    throw error;
  })
});
