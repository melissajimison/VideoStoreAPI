var request = require('request');
var base_url = "http://localhost:3000/";

describe('MoviesController', function() {
  describe("Endpoint at /", function() {
    var url = function(endpoint) {
      return base_url + "movies" + endpoint;
    };

    it('responds with a 200 status code', function(done) {
      request.get(url('/'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });
  });

  describe("Endpoint at /sort", function() {
    var url = function(endpoint) {
      return base_url + "movies/sort" + endpoint;
    };

    it('responds with a 200 status code for a valid url', function(done) {
      request.get(url('/title?n=10&p=1'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });

    it('responds with a 200 status code for released_date', function(done) {
      request.get(url('/release_date?n=6&p=1'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });

    it('responds with a 200 status code for title', function(done) {
      request.get(url('/title?n=6&p=1'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });

    it('responds with a 200 status code for mispelling (by default sorts by id if invalid sort column given)', function(done) {
      request.get(url('/released-date?n=10&p=1'), function(error, response, body) {
        expect(response.statusCode).toEqual(200);
        done();
      });
    });
  });

  describe("Endpoint at movies/:title/current", function() {
    var url = function(endpoint) {
      return base_url + "movies" + endpoint;
    };

    it('responds with a 200 status code for a valid movie', function(done) {
      request.get(url('/Jaws/current'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });

    it('responds with a 204 status code for an invalid movie', function(done) {
      request.get(url('/asdfasdfasdf/current'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(204);
        done();
      });
    });
  });

  describe("Endpoint at movies/:title/history/sort/:column", function() {
    var url = function(endpoint) {
      return base_url + "movies" + endpoint;
    };

    it('responds with a 200 status code for a valid movie', function(done) {
      request.get(url('/Jaws/history/sort/name'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });

    it('responds with a 204 status code for an invalid movie', function(done) {
      request.get(url('/asdfasdfasdf/history/sort/name'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(204);
        done();
      });
    });

    it('responds with a 200 status code for an invalid sort column (sorted by id by default)', function(done) {
      request.get(url('/Jaws/history/sort/blahblah'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });
  });
});
