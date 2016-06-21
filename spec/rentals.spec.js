var app = require("../../app");
var db = app.get("db");
var Account = require('../../models/account')

describe('Account', function () {
  var rental1
  beforeEach(function (done) {
    rental = {
      movie_id : 42,
      customer_id: 45,
      status : 'rented'
    }
    rental1 = db.movies.saveSync(rental);
  })
})

afterEach(function () {
     // delete all the accounts I created
  db.end()
})

describe('#available', function () {
    it('should return number of rentals available', function (done) {
      rental1.available(32, function (error, aval) {
        expect(error).toBeNull
        expect(aval).toEqual(5)
        done()
      })
    })

    // it('should not break, I guess', function (done) {
    //   rental1.getBalance(function (error, balance) {
    //     expect(error).toBeNull
    //     expect(balance).toEqual('$100.00')
    //     done()
    //   })
    // })
  })
})
