require('dotenv').config();
const Item = require('../../../models/item')
const chai = require('chai');
const should = chai.should();

describe('Item model', function() {
  this.timeout(0)

  afterEach(() => {
    Item.remove({}, (err) => {
      if (err) throw err
    })
  });

  it('can create a new item', () => {
    let attrs = {
      name: 'pear',
      price: '$10',
      seller: 'Costco'
    }
    let item = new Item(attrs)

    return item.save().then((saved) => {
      saved.isNew.should.eq(false)
      saved.id.should.not.eq(null)
      saved.name.should.eq('pear')
      saved.price.should.eq('$10')
      saved.seller.should.eq('Costco')
    })
    .catch((e) => {
      throw e
    })
  })
});
