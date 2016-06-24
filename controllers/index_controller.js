var docs = require ("../json.js");

var IndexController = {
  getjson: function (req, res, next) {
    res.status(200).json(docs);
  }
};

module.exports = IndexController;
