var massive = require('massive');
var connectionString = "postgres://localhost/videoStore";

var db = massive.connectSync({connectionString : connectionString});

db.setup.schema([], function(err, result) {
 if (err) {
   throw(new Error(err.message));
 }

 console.log("yay schema!");
 process.exit();
});
