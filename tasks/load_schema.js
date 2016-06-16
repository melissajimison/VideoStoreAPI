var app = require("../app");
var db = app.get("db");

db.setup.schema([], function(err, result) {
 if (err) {
   throw(new Error(err.message));
 }

 console.log("yay schema!");
 process.exit();
});
