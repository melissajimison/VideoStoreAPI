var app = require("../../app");
var db = app.get("db");
var Rentals = require('../../models/rentals')

afterEach(function () {
  // delete all the accounts I created
  db.end()
})

describe('#available', function () {
  it('should return number of rentals available', function (done) {
    var movie_id = 33;
    Rentals.available(movie_id, function (error, costumers) {
      expect(error).toBeNull
      expect(costumers).toEqual(9)
      done()
    })
  })

  it('should return number of rentals available', function (done) {
    var movie_id = 2;
    Rentals.available(movie_id, function (error, result) {
      expect(error).toBeNull
      expect(result).toEqual(4)
      done()
    })
  })
})

describe('#find_customers_by_title', function () {
  it('should return custumers info with a givin title', function (done) {
    var title = "Jaws";
    Rentals.find_customers_by_title(title, function (error, costumers) {
      expect(error).toBeNull
      expect(Array.isArray(costumers)).toEqual(true)
      expect(typeof costumers[0]).toEqual('object')
      expect(costumers[0].name).toEqual('Curran Stout')
      expect(costumers[0].registered_at).toEqual('Wed, 16 Apr 2014 21:40:20 -0700')
      expect(costumers[0].address).toEqual('Ap #658-1540 Erat Rd.')
      expect(costumers[0].city).toEqual('San Francisco')
      expect(costumers[0].state).toEqual('California')
      expect(costumers[0].postal_code).toEqual('94267')
      done()
    })
  })

  it('should return an empty array if no customers were found', function (done) {
    var title = "Titanic";
    Rentals.find_customers_by_title(title, function (error, costumers) {
      expect(error).toBeNull
      expect(Array.isArray(costumers)).toEqual(true)
      expect(costumers).toEqual([])
      done()
    })
  })

  it('should return an empty array if given a bad request', function (done) {
    var title = "melissa";
    Rentals.find_customers_by_title(title, function (error, costumers) {
      expect(error).toBeNull
      expect(Array.isArray(costumers)).toEqual(true)
      expect(costumers).toEqual([])
      done()
    })
  })
})
