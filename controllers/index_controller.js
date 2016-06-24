var doc = require ("../doc.json");


var IndexController = {
  locals: {
    documentation: doc
  },

  getJSON: function (req, res, next) {
    res.json(200, doc);
  },

  getHTML: function(req, res, next) {
    // console.log(string_docs);
    res.render('docs', IndexController.locals);
  }
};



module.exports = IndexController;
