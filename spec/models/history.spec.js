var app = require("../../app");
var db = app.get("db");

var History = require('../../models/history');

describe('History', function () {
  afterEach(function () {
    db.end();
  });

  describe('#create_record', function () {
    it('returns a History instance that has all properties defined', function (done) {
      History.create_record(1, 1, function(error, result) {
        expect(error).toBeNull;
        expect(result.id).toNotBe(null);
        expect(result.rental_id).toNotBe(null);
        expect(result.customer_id).toNotBe(null);
        expect(result.checkout_date).toNotBe(null);
        expect(result.return_date).toNotBe(null);
        expect(result.overdue).toBe(false);
        db.history.destroy({id: result.id}, function(err, res){done()});
      });
    });
  });
});
