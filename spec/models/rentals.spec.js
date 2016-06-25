var app = require("../../app");
var db = app.get("db");
var Rentals = require('../../models/rentals')

describe('Rentals', function () {

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

    it('should return number of rentals available', function (done) {
      var movie_id = 25;
      Rentals.available(movie_id, function (error, result) {
        expect(error).toBeNull
        expect(result).toEqual(5)
        done()
      })
    })
  })

  describe('#find_customers_by_title', function () {
    it('should return custumers info with a given title', function (done) {
      var title = "Jaws";
      Rentals.find_customers_by_title(title, function (error, costumers) {
        expect(error).toBeNull
        expect(Array.isArray(costumers)).toEqual(true)
        expect(typeof costumers[0]).toEqual('object')
        expect(typeof costumers[0].name).toEqual('string')
        expect(typeof costumers[0].registered_at).toEqual('string')
        expect(typeof costumers[0].address).toEqual('string')
        expect(typeof costumers[0].city).toEqual('string')
        expect(typeof costumers[0].state).toEqual('string')
        expect(typeof costumers[0].postal_code).toEqual('string')
        expect(typeof costumers[0].account_credit).toEqual('string')

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

  describe('#mark_as_checkout', function () {
    it('should return number of rentals mark_as_checkout', function (done) {
      var movie = 'Raging Bull';
      var costumer_id = 102;

      Rentals.mark_as_checkout(movie, costumer_id, function (error, info) {
        expect(error).toBeNull
        expect(Array.isArray(info)).toEqual(true)
        // expect(typeof info[0].id).toEqual('number')
        // expect(info[0][movie_id]).toEqual(51)
        // expect(info[0][customer_id).toEqual(102)
        // expect(info[0][status).toEqual('rented')
        done()
      })
    })

    it('should return number of rentals mark_as_checkout', function (done) {
      var movie = "The Great Escape";
      var costumer_id = 42;
      Rentals.mark_as_checkout(movie, costumer_id, function (error, info) {
        expect(error).toBeNull
        expect(Array.isArray(info)).toEqual(true)
        done()
      })
    })
  })

  describe('#get_overdue', function () {
    it('should return all the  of rentals get_overdue', function (done) {
      Rentals.get_overdue(function (error, info) {
        expect(error).toBeNull
        expect(Array.isArray(info)).toEqual(true)
        expect(typeof info[0]).toEqual("object")
        expect(typeof info[0].name).toEqual("string")
        expect(typeof info[0].title).toEqual("string")
        expect(typeof info[0].checkout_date).toEqual("string")
        expect(typeof info[0].return_date).toEqual("string")
        done()
      })
    })

  })

});
